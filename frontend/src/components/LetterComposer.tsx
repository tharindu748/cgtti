import React, { useState, useEffect } from 'react';
import { Member, LetterTemplate, LetterFormData } from '@types';
import { lettersAPI } from '@api/letters';
import { useAuth } from '@context/AuthContext';

interface LetterComposerProps {
  selectedMembers: Member[];
  onClose: () => void;
  onSuccess?: () => void;
}

const defaultTemplates: LetterTemplate[] = [
  {
    id: 'certificate',
    name: 'Membership Certificate',
    subject: 'Membership Certificate - {memberName}',
    content: `CGTTI ALUMNI ASSOCIATION
OFFICIAL MEMBERSHIP CERTIFICATE

This is to certify that

{memberName}
Training Number: {trainingNumber}
Membership Number: {membershipNumber}
Trade: {trade}
District: {district}

is a registered member of the CGTTI Alumni Association in good standing.

This certificate is issued in recognition of your continued association with our alma mater and your support of our alumni community.

Reason: {reason}

Issued on: {currentDate}

Sincerely,
CGTTI Alumni Association
Administration Office`,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'event',
    name: 'Event Invitation',
    subject: 'Invitation: CGTTI Alumni Annual Gathering - {currentDate}',
    content: `Dear {memberName},

You are cordially invited to the CGTTI Alumni Association Annual Gathering!

We are excited to bring together our alumni community for an evening of networking, reminiscing, and celebration. This is a wonderful opportunity to reconnect with old friends, meet new members, and strengthen our alumni network.

EVENT DETAILS:
Date: {currentDate}
Time: 6:00 PM onwards
Venue: CGTTI Main Auditorium
Dress Code: Smart Casual

As a valued member from the {trade} department, your presence would greatly contribute to the success of this event.

{reason}

Please RSVP by replying to this letter or contacting our office at your earliest convenience.

We look forward to seeing you there!

Warm regards,

CGTTI Alumni Association
Event Committee`,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'renewal',
    name: 'Membership Renewal',
    subject: 'Membership Renewal Notice - {memberName}',
    content: `Dear {memberName},

MEMBERSHIP RENEWAL NOTICE

This is a friendly reminder regarding your CGTTI Alumni Association membership renewal.

Our records indicate that your membership requires renewal for the upcoming year. Continuing your membership ensures you stay connected with our growing alumni network and receive all associated benefits.

MEMBER DETAILS:
Name: {memberName}
Membership Number: {membershipNumber}
Training Number: {trainingNumber}
District: {district}

{reason}

BENEFITS OF RENEWAL:
• Access to alumni events and networking opportunities
• Career development resources
• Industry updates and newsletters
• Member discounts and privileges

To renew your membership, please visit our office or contact us at the provided numbers. We accept multiple payment methods for your convenience.

Thank you for being part of our alumni community. We value your continued support.

Sincerely,

CGTTI Alumni Association
Membership Department`,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const LetterComposer: React.FC<LetterComposerProps> = ({
  selectedMembers,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<LetterTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customSubject, setCustomSubject] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [reason, setReason] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewMember, setPreviewMember] = useState<Member | null>(selectedMembers[0] || null);
  const [exportLoading, setExportLoading] = useState(false);
  const [emailOption, setEmailOption] = useState<'none' | 'individual' | 'bulk'>('none');
  const [emailLoading, setEmailLoading] = useState(false);

  const availablePlaceholders = [
    { placeholder: '{memberName}', description: 'Member Full Name' },
    { placeholder: '{trainingNumber}', description: 'Training Number' },
    { placeholder: '{membershipNumber}', description: 'Membership Number' },
    { placeholder: '{trade}', description: 'Trade/Department' },
    { placeholder: '{district}', description: 'District' },
    { placeholder: '{address}', description: 'Full Address' },
    { placeholder: '{mobile}', description: 'Mobile Number' },
    { placeholder: '{email}', description: 'Email Address' },
    { placeholder: '{nic}', description: 'NIC Number' },
    { placeholder: '{reason}', description: 'Letter Reason' },
    { placeholder: '{currentDate}', description: 'Current Date' },
    { placeholder: '{generatedDate}', description: 'Generation Date' }
  ];

  const generatePreview = (member: Member, template?: LetterTemplate): { subject: string; content: string } => {
    const templateToUse = template || templates.find(t => t.id === selectedTemplate);
    
    let subject = isCustom ? (customSubject || '') : (templateToUse?.subject || '');
    let content = isCustom ? (customContent || '') : (templateToUse?.content || '');

    if (typeof subject !== 'string') subject = '';
    if (typeof content !== 'string') content = '';

    const placeholders: Record<string, string> = {
      '{memberName}': member?.name || '',
      '{trainingNumber}': member?.trainingNumber || '',
      '{membershipNumber}': member?.membershipNumber || '',
      '{trade}': (member?.trade || '').replace(/_/g, ' '),
      '{district}': member?.district || '',
      '{address}': member?.address || '',
      '{mobile}': member?.mobile || '',
      '{email}': member?.email || 'Not provided',
      '{nic}': member?.nic || '',
      '{reason}': reason || '',
      '{currentDate}': new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      '{generatedDate}': new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    try {
      Object.entries(placeholders).forEach(([key, value]) => {
        if (subject && typeof subject === 'string') {
          subject = subject.replace(new RegExp(key, 'g'), value);
        }
        if (content && typeof content === 'string') {
          content = content.replace(new RegExp(key, 'g'), value);
        }
      });
    } catch (error) {
      console.error('Error during placeholder replacement:', error);
    }

    return { subject: subject || '', content: content || '' };
  };

  const insertPlaceholder = (placeholder: string) => {
    const textarea = document.getElementById('letter-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = customContent.substring(0, start) + placeholder + customContent.substring(end);
    
    setCustomContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + placeholder.length, start + placeholder.length);
    }, 0);
  };

  const handleGenerateLetters = async () => {
    if (!reason.trim()) {
      alert('Please enter a reason for the letter');
      return;
    }

    if (isCustom && (!customSubject.trim() || !customContent.trim())) {
      alert('Please provide both subject and content for the custom letter');
      return;
    }

    if (!isCustom && !selectedTemplate) {
      alert('Please select a template');
      return;
    }

    setLoading(true);

    try {
      const templateToUse = templates.find(t => t.id === selectedTemplate);
      const letterData: LetterFormData = {
        templateId: isCustom ? undefined : selectedTemplate,
        subject: isCustom ? customSubject : templateToUse?.subject || '',
        content: isCustom ? customContent : templateToUse?.content || '',
        reason,
        isCustom,
        selectedMemberIds: selectedMembers.map(m => m.id),
        sendEmail: emailOption !== 'none',
        emailType: emailOption
      };

      await lettersAPI.generateLetters(letterData);
      
      let successMessage = `Successfully generated ${selectedMembers.length} letter(s)`;
      if (emailOption !== 'none') {
        successMessage += ` and sent ${emailOption === 'individual' ? 'individual' : 'bulk'} emails`;
      }
      
      alert(successMessage);
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Failed to generate letters:', error);
      alert('Failed to generate letters: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!previewMember) {
      alert('Please select a member to send test email');
      return;
    }

    if (!previewMember.email) {
      alert('Selected member does not have an email address');
      return;
    }

    setEmailLoading(true);

    try {
      const templateToUse = templates.find(t => t.id === selectedTemplate);
      const testEmailData = {
        memberId: previewMember.id,
        subject: isCustom ? customSubject : templateToUse?.subject || '',
        content: isCustom ? customContent : templateToUse?.content || '',
        reason,
        isCustom,
        templateId: isCustom ? undefined : selectedTemplate
      };

      await lettersAPI.sendTestEmail(testEmailData);
      alert('Test email sent successfully to ' + previewMember.email);
    } catch (error: any) {
      console.error('Failed to send test email:', error);
      alert('Failed to send test email: ' + (error.message || 'Unknown error'));
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePrintPreview = (member: Member) => {
    if (!member) return;
    
    const { subject, content } = generatePreview(member);
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${subject} - ${member.name}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                line-height: 1.6; 
                margin: 40px; 
                color: #333;
                max-width: 800px;
                margin: 0 auto;
              }
              .letter-header { 
                text-align: center; 
                margin-bottom: 40px;
                border-bottom: 2px solid #1e40af;
                padding-bottom: 20px;
              }
              .logo { 
                font-size: 24px; 
                font-weight: bold; 
                color: #1e40af;
                margin-bottom: 10px;
              }
              .subject { 
                font-size: 18px; 
                font-weight: bold; 
                margin: 30px 0;
                color: #1f2937;
                text-align: center;
              }
              .content { 
                margin: 30px 0; 
                white-space: pre-wrap;
                font-size: 14px;
                line-height: 1.8;
              }
              .member-info {
                background: #f8fafc;
                padding: 15px;
                border-left: 4px solid #1e40af;
                margin: 20px 0;
                font-size: 13px;
              }
              .footer { 
                margin-top: 60px; 
                border-top: 1px solid #ccc;
                padding-top: 20px;
                font-size: 12px;
                color: #6b7280;
                text-align: center;
              }
              .signature {
                margin-top: 80px;
              }
              @media print {
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="letter-header">
              <div class="logo">CGTTI ALUMNI ASSOCIATION</div>
              <div>Official Correspondence</div>
            </div>
            
            <div class="member-info">
              <strong>Member Details:</strong><br/>
              Name: ${member.name || ''}<br/>
              Training Number: ${member.trainingNumber || ''}<br/>
              Membership Number: ${member.membershipNumber || ''}<br/>
              Trade: ${(member.trade || '').replace(/_/g, ' ')}<br/>
              District: ${member.district || ''}<br/>
              NIC: ${member.nic || ''}
            </div>

            <div class="subject">${subject}</div>
            
            <div class="content">${content}</div>
            
            <div class="signature">
              <div>Sincerely,</div>
              <br/><br/>
              <div>
                <strong>CGTTI Alumni Association</strong><br/>
                Administration Office
              </div>
            </div>
            
            <div class="footer">
              Generated on: ${new Date().toLocaleDateString()} | 
              Generated by: ${user?.email || 'System'} |
              Member ID: ${member.membershipNumber || ''}
            </div>

            <div class="no-print" style="margin-top: 20px; text-align: center;">
              <button onclick="window.print()" style="padding: 10px 20px; background: #1e40af; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Print Letter
              </button>
              <button onclick="window.close()" style="padding: 10px 20px; background: #6b7280; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                Close
              </button>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const exportToPDF = async (member: Member) => {
    if (!member) return;
    
    setExportLoading(true);
    
    try {
      const { subject, content } = generatePreview(member);
      
      // Simple PDF generation using browser print
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${subject} - ${member.name}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                line-height: 1.6; 
                margin: 40px; 
                color: #333;
                max-width: 800px;
                margin: 0 auto;
              }
              .letter-header { 
                text-align: center; 
                margin-bottom: 40px;
                border-bottom: 2px solid #1e40af;
                padding-bottom: 20px;
              }
              .logo { 
                font-size: 24px; 
                font-weight: bold; 
                color: #1e40af;
                margin-bottom: 10px;
              }
              .subject { 
                font-size: 18px; 
                font-weight: bold; 
                margin: 30px 0;
                color: #1f2937;
                text-align: center;
              }
              .content { 
                margin: 30px 0; 
                white-space: pre-wrap;
                font-size: 14px;
                line-height: 1.8;
              }
              .member-info {
                background: #f8fafc;
                padding: 15px;
                border-left: 4px solid #1e40af;
                margin: 20px 0;
                font-size: 13px;
              }
              .footer { 
                margin-top: 60px; 
                border-top: 1px solid #ccc;
                padding-top: 20px;
                font-size: 12px;
                color: #6b7280;
                text-align: center;
              }
              .signature {
                margin-top: 80px;
              }
              @media print {
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="letter-header">
              <div class="logo">CGTTI ALUMNI ASSOCIATION</div>
              <div>Official Correspondence</div>
            </div>
            
            <div class="member-info">
              <strong>Member Details:</strong><br/>
              Name: ${member.name || ''}<br/>
              Training Number: ${member.trainingNumber || ''}<br/>
              Membership Number: ${member.membershipNumber || ''}<br/>
              Trade: ${(member.trade || '').replace(/_/g, ' ')}<br/>
              District: ${member.district || ''}<br/>
              NIC: ${member.nic || ''}
            </div>

            <div class="subject">${subject}</div>
            
            <div class="content">${content}</div>
            
            <div class="signature">
              <div>Sincerely,</div>
              <br/><br/>
              <div>
                <strong>CGTTI Alumni Association</strong><br/>
                Administration Office
              </div>
            </div>
            
            <div class="footer">
              Generated on: ${new Date().toLocaleDateString()} | 
              Generated by: ${user?.email || 'System'} |
              Member ID: ${member.membershipNumber || ''}
            </div>

            <div class="no-print" style="margin-top: 20px; text-align: center;">
              <div style="margin-bottom: 10px; font-size: 14px; font-weight: bold;">
                To save as PDF: In the print dialog, select "Save as PDF" as destination
              </div>
              <button onclick="window.print()" style="padding: 10px 20px; background: #1e40af; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
                Open Print Dialog
              </button>
              <button onclick="window.close()" style="padding: 10px 20px; background: #6b7280; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
                Close
              </button>
            </div>
          </body>
        </html>
      `;
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const exportAllToPDF = async () => {
  if (selectedMembers.length === 0) return;
  
  setExportLoading(true);
  
  try {
    // Create a single PDF with all letters
    const { subject: firstSubject } = generatePreview(selectedMembers[0]);
    const pdf = new jsPDF();
    
    selectedMembers.forEach((member, index) => {
      // Add new page for each member (except the first one)
      if (index > 0) {
        pdf.addPage();
      }
      
      const { subject, content } = generatePreview(member);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Add header
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 64, 175);
      pdf.text('CGTTI ALUMNI ASSOCIATION', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 10;
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Official Correspondence', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 20;

      // Add member information box
      pdf.setFillColor(248, 250, 252);
      pdf.rect(margin, yPosition, pageWidth - (margin * 2), 40, 'F');
      pdf.setDrawColor(30, 64, 175);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPosition, margin, yPosition + 40);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Member Details:', margin + 5, yPosition + 8);
      
      pdf.setFont('helvetica', 'normal');
      const memberDetails = [
        `Name: ${member.name || ''}`,
        `Training Number: ${member.trainingNumber || ''}`,
        `Membership Number: ${member.membershipNumber || ''}`,
        `Trade: ${(member.trade || '').replace(/_/g, ' ')}`,
        `District: ${member.district || ''}`,
        `NIC: ${member.nic || ''}`
      ];
      
      memberDetails.forEach((detail, detailIndex) => {
        pdf.text(detail, margin + 5, yPosition + 16 + (detailIndex * 6));
      });
      
      yPosition += 50;

      // Add subject
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(subject, pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;

      // Add content with page breaks
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const splitContent = pdf.splitTextToSize(content, pageWidth - (margin * 2));
      
      splitContent.forEach((line: string) => {
        // Check if we need a new page
        if (yPosition > pageHeight - margin - 20) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Add signature section
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.text('Sincerely,', margin, yPosition);
      yPosition += 20;
      pdf.setFont('helvetica', 'bold');
      pdf.text('CGTTI Alumni Association', margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Administration Office', margin, yPosition + 6);

      // Add footer
      const footerY = pageHeight - 20;
      pdf.setFontSize(8);
      pdf.setTextColor(107, 114, 128);
      const footerText = `Generated on: ${new Date().toLocaleDateString()} | Generated by: ${user?.email || 'System'} | Member ID: ${member.membershipNumber || ''} | Page ${pdf.getNumberOfPages()}`;
      pdf.text(footerText, pageWidth / 2, footerY, { align: 'center' });
    });

    // Save the combined PDF
    const fileName = `CGTTI_Letters_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    alert(`Successfully generated ${selectedMembers.length} letters in one PDF file: ${fileName}`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    setExportLoading(false);
  }
};
  // Get members with email addresses
  const membersWithEmail = selectedMembers.filter(member => member.email);
  const membersWithoutEmail = selectedMembers.filter(member => !member.email);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Generate Letters & Emails ({selectedMembers.length} members selected)
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Reason Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Letter *
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Membership renewal, Event invitation, Certificate request..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Options
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="none"
                  checked={emailOption === 'none'}
                  onChange={(e) => setEmailOption(e.target.value as any)}
                  className="mr-2"
                />
                Don't send emails (Generate letters only)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="individual"
                  checked={emailOption === 'individual'}
                  onChange={(e) => setEmailOption(e.target.value as any)}
                  className="mr-2"
                />
                Send individual emails (Each member receives personalized email)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="bulk"
                  checked={emailOption === 'bulk'}
                  onChange={(e) => setEmailOption(e.target.value as any)}
                  className="mr-2"
                />
                Send bulk email (All members in one email - BCC)
              </label>
            </div>
            
            {emailOption !== 'none' && (
              <div className="mt-3 p-3 bg-blue-50 rounded-md">
                <div className="text-sm text-blue-700">
                  <strong>Email Summary:</strong>
                  <div>• Members with email: {membersWithEmail.length}</div>
                  <div>• Members without email: {membersWithoutEmail.length}</div>
                  {membersWithoutEmail.length > 0 && (
                    <div className="text-orange-600 mt-1">
                      Note: {membersWithoutEmail.length} member(s) without email addresses will not receive emails
                    </div>
                  )}
                </div>
                
                {previewMember && previewMember.email && (
                  <button
                    onClick={handleSendTestEmail}
                    disabled={emailLoading}
                    className="mt-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 disabled:opacity-50"
                  >
                    {emailLoading ? 'Sending...' : 'Send Test Email to ' + previewMember.name}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Letter Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Letter Type
            </label>
            <div className="flex space-x-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!isCustom}
                  onChange={() => setIsCustom(false)}
                  className="mr-2"
                />
                Use Template
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={isCustom}
                  onChange={() => setIsCustom(true)}
                  className="mr-2"
                />
                Custom Letter
              </label>
            </div>

            {!isCustom ? (
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a template</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Letter subject..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Letter Content *
                  </label>
                  
                  {/* Placeholder Buttons */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Placeholders:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availablePlaceholders.map(({ placeholder, description }) => (
                        <button
                          key={placeholder}
                          type="button"
                          onClick={() => insertPlaceholder(placeholder)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200"
                          title={description}
                        >
                          {placeholder}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    id="letter-content"
                    value={customContent}
                    onChange={(e) => setCustomContent(e.target.value)}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your letter content here. Use placeholders for dynamic member information."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          {(selectedTemplate || isCustom) && previewMember && (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Letter Preview</h3>
                <div className="flex space-x-2">
                  <select
                    value={previewMember?.id || ''}
                    onChange={(e) => {
                      const newMember = selectedMembers.find(m => m.id === e.target.value);
                      if (newMember) setPreviewMember(newMember);
                    }}
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                  >
                    {selectedMembers.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name} {member.email ? `(${member.email})` : '(No email)'}
                      </option>
                    ))}
                  </select>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => previewMember && handlePrintPreview(previewMember)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      Preview & Print
                    </button>
                    <button
                      onClick={() => previewMember && exportToPDF(previewMember)}
                      disabled={exportLoading}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
                    >
                      {exportLoading ? 'Exporting...' : 'Export PDF'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded border">
                <div className="text-sm text-gray-600 space-y-2">
                  <div><strong>Subject:</strong> {generatePreview(previewMember).subject}</div>
                  <div><strong>Content Preview:</strong></div>
                  <div className="whitespace-pre-wrap text-xs bg-white p-3 rounded border">
                    {(generatePreview(previewMember).content || '').substring(0, 200)}...
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Selected Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Members ({selectedMembers.length})
            </label>
            <div className="bg-gray-50 rounded-md p-4 max-h-40 overflow-y-auto">
              {selectedMembers.map(member => (
                <div key={member.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <span className="font-medium">{member.name}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({member.trainingNumber} • {(member.trade || '').replace(/_/g, ' ')} • {member.district})
                      {member.email && <span className="text-blue-600"> • {member.email}</span>}
                      {!member.email && <span className="text-red-600"> • No email</span>}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    member.isVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {member.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-between items-center">
          <div className="flex space-x-2">
            {selectedMembers.length > 0 && (
              <button
                onClick={exportAllToPDF}
                disabled={exportLoading || !reason.trim() || (!isCustom && !selectedTemplate) || (isCustom && (!customSubject.trim() || !customContent.trim()))}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exportLoading ? 'Exporting PDFs...' : `Export All (${selectedMembers.length}) as PDF`}
              </button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerateLetters}
              disabled={loading || !reason.trim() || (!isCustom && !selectedTemplate) || (isCustom && (!customSubject.trim() || !customContent.trim()))}
              className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : `Generate & ${emailOption !== 'none' ? 'Email' : 'Save'} ${selectedMembers.length} Letter(s)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};