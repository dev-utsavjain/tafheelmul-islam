import Markdown from "react-markdown";

const privacyPolicyMarkdown = `
# Privacy Policy

Last Updated: June 2026

## Introduction

Tafheem-ul-Islam Trust ("the Trust", "we", "our", or "us") is committed to protecting the privacy and personal information of our donors, volunteers, beneficiaries, and website visitors.

This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, make a donation, submit an inquiry, or interact with our services.

By using this website, you agree to the practices described in this Privacy Policy.

## About Tafheem-ul-Islam Trust

Tafheem-ul-Islam Trust is a humanitarian organization based in Jammu & Kashmir, India, serving humanity irrespective of religion or region. For over 30 years, the Trust has worked to support orphans, widows, chronically ill patients, disaster-affected families, and vulnerable communities through charitable and welfare initiatives.

## Information We Collect

We may collect the following information when you interact with our website:

### Personal Information

* Full Name
* Email Address
* Phone Number
* Postal Address (if provided)
* PAN Number (optional, for donation records)
* Donation Amount
* Transaction Details and Reference Numbers

### Contact Form Information

When you submit an inquiry, volunteer application, or support request, we may collect:

* Name
* Email Address
* Phone Number
* Subject
* Message Content

### Technical Information

When you browse our website, certain information may be collected automatically:

* IP Address
* Browser Type
* Device Information
* Pages Visited
* Referral Sources
* Date and Time of Visit

## How We Use Your Information

The information we collect may be used to:

* Process donations securely
* Generate donation receipts and acknowledgements
* Respond to inquiries and support requests
* Communicate important updates regarding donations or services
* Improve website functionality and user experience
* Maintain financial and legal records
* Prevent fraud and unauthorized activities
* Comply with applicable laws and regulations

## Donation Security

All online donations are processed through secure payment gateway providers.

Tafheem-ul-Islam Trust does not store your debit card, credit card, banking credentials, UPI PIN, or other sensitive payment information on its servers.

Payment transactions are encrypted and handled by trusted third-party payment processors in accordance with industry security standards.

## Sharing of Information

We respect your privacy and do not sell, rent, trade, or share personal information with third parties for marketing purposes.

Information may only be shared when:

* Required for payment processing
* Necessary for legal or regulatory compliance
* Required to protect the rights, safety, or security of the Trust or others
* Necessary to provide services requested by the user

## Data Retention

We retain personal information only for as long as necessary to:

* Maintain donation and accounting records
* Fulfill legal and regulatory obligations
* Resolve disputes and enforce agreements
* Improve our services and operations

When information is no longer required, it is securely deleted or anonymized.

## Cookies and Analytics

Our website may use cookies and similar technologies to improve user experience and understand website performance.

Cookies may help us:

* Remember user preferences
* Analyze website traffic
* Improve website functionality
* Measure engagement and performance

We may use analytics services such as Google Analytics to understand visitor behavior and improve our website.

Users may disable cookies through their browser settings if preferred.

## Protection of Children's Information

The Trust does not knowingly collect personal information from children through its website without appropriate consent.

If a parent or guardian believes that a child has provided personal information through our website, they may contact us for its removal.

## Data Security

We implement reasonable technical and organizational measures to protect personal information against:

* Unauthorized access
* Misuse
* Alteration
* Disclosure
* Loss or destruction

While we strive to protect all information, no online transmission or storage system can be guaranteed to be completely secure.

## Third-Party Links

Our website may contain links to external websites, social media platforms, or third-party services.

We are not responsible for the privacy practices, content, or policies of third-party websites. Users are encouraged to review the privacy policies of those websites separately.

## Your Rights

You may request to:

* Access your personal information
* Correct inaccurate information
* Update your contact details
* Request deletion of personal information where legally permissible

Requests may be submitted through the contact information provided below.

## Policy Updates

Tafheem-ul-Islam Trust reserves the right to update or modify this Privacy Policy at any time.

Any changes will be published on this page with an updated revision date. Continued use of the website after changes are posted constitutes acceptance of the revised policy.

## Contact Us

If you have any questions regarding this Privacy Policy or how your information is handled, please contact us:

Tafheem-ul-Islam Trust
Jammu & Kashmir, India

Email: tafeemulislam524@gmail.com
Phone: +91 99068 22744

We will make reasonable efforts to respond to privacy-related inquiries promptly.
`;

export function PrivacyPolicyPage() {
  return (
    <main className="flex-grow flex flex-col px-4 sm:px-6 lg:px-20 w-full mx-auto pt-4 md:pt-12 pb-12 md:pb-24">
      <div className="max-w-4xl w-full mx-auto bg-white border border-gray-200 rounded-[20px] md:rounded-[32px] p-6 md:p-16 shadow-sm">
        <div className="markdown-body">
          <Markdown>{privacyPolicyMarkdown}</Markdown>
        </div>
      </div>
    </main>
  );
}
