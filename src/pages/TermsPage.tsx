import Markdown from "react-markdown";
import { Helmet } from "react-helmet-async";

const termsMarkdown = `
# Terms & Conditions

**Last Updated:** June 2026

## Welcome

Welcome to the official website of Tafheem-ul-Islam Trust ("the Trust", "we", "our", or "us"). By accessing, browsing, donating through, or otherwise using this website, you agree to comply with and be bound by the following Terms & Conditions.

If you do not agree with any part of these terms, please refrain from using this website.

---

## About Tafheem-ul-Islam Trust

Tafheem-ul-Islam Trust is a humanitarian and charitable organization based in Anantnag district, Jammu and Kashmir, India. For more than 10 years, the Trust has been serving humanity irrespective of religion or region by supporting orphans, widows, chronically ill patients, disaster-affected families, and other vulnerable communities.

The Trust is committed to promoting education, healthcare assistance, humanitarian relief, and community welfare initiatives.

---

## Use of the Website

By using this website, you agree to:

* Use the website only for lawful purposes.
* Provide accurate and truthful information when submitting forms or making donations.
* Refrain from any activity that may damage, disrupt, or interfere with the website's operation.
* Respect the intellectual property and content published on the website.

The Trust reserves the right to restrict or terminate access to any user who violates these terms.

---

## Donations

### Voluntary Contributions

All donations made to Tafheem-ul-Islam Trust are voluntary contributions intended to support the Trust's charitable and humanitarian activities.

Donors are encouraged to contribute responsibly and only after reviewing the information available on the website.

### Use of Donations

Donations received by the Trust may be used for:

* Education support initiatives
* Healthcare and medical assistance
* Orphan and widow welfare programs
* Disaster relief and emergency response
* Community development activities
* Administrative and operational requirements necessary to carry out charitable work

The allocation of funds remains at the discretion of the Trust based on assessed needs and priorities.

### No Guaranteed Beneficiary Allocation

While donors may indicate a preferred cause or program, the Trust reserves the right to redirect funds where they are most urgently needed to maximize humanitarian impact.

---

## Assistance and Beneficiary Support

The Trust provides assistance based on:

* Verified need
* Availability of resources
* Program eligibility criteria
* Internal assessment procedures

Submission of a request for assistance does not guarantee approval or support.

The Trust reserves the right to accept, reject, postpone, or discontinue assistance at its discretion.

---

## Donation Refund Policy

As charitable donations are made voluntarily and are typically utilized promptly for humanitarian purposes:

* Donations are generally non-refundable.
* Refund requests may be considered only in exceptional circumstances, such as duplicate transactions or proven payment errors.
* Any approved refund shall be processed at the sole discretion of the Trust.

Requests for refund consideration must be submitted within a reasonable period following the transaction.

---

## Donation Receipts

Upon successful completion of a donation, donors may receive:

* An acknowledgment email
* A donation receipt
* Transaction details for record-keeping purposes

It is the donor's responsibility to ensure that contact information provided during donation is accurate and up to date.

---

## Privacy and Data Protection

Any personal information collected through the website is handled in accordance with our Privacy Policy.

By using this website, you consent to the collection and use of information as described in the Privacy Policy.

The Trust does not sell or share donor information for commercial marketing purposes.

---

## Intellectual Property

All content on this website, including but not limited to:

* Text
* Logos
* Graphics
* Images
* Videos
* Design elements
* Publications

is the property of Tafheem-ul-Islam Trust or its respective content providers and is protected under applicable intellectual property laws.

No content may be copied, reproduced, modified, distributed, or used for commercial purposes without prior written permission.

---

## Third-Party Services and Links

This website may contain links to external websites, payment gateways, social media platforms, or third-party services.

The Trust is not responsible for:

* The content of external websites
* Third-party privacy practices
* Availability of external services
* Any losses arising from third-party interactions

Users access such services at their own discretion.

---

## Limitation of Liability

While the Trust strives to maintain accurate and updated information, we do not guarantee that all content on the website is free from errors or omissions.

Tafheem-ul-Islam Trust shall not be liable for:

* Temporary website interruptions
* Technical issues beyond our control
* Data transmission failures
* Losses arising from reliance on website information
* Unauthorized access caused by circumstances beyond reasonable control

Users access and use the website at their own risk.

---

## Changes to Programs and Policies

The Trust reserves the right to:

* Modify programs and services
* Update eligibility criteria
* Change website content
* Amend operational procedures
* Revise these Terms & Conditions at any time

Changes become effective immediately upon publication on the website.

Continued use of the website constitutes acceptance of any revised terms.

---

## Governing Law

These Terms & Conditions shall be governed and interpreted in accordance with the laws of India.

Any disputes arising from the use of this website or donations made to the Trust shall be subject to the jurisdiction of the competent courts in Anantnag district, Jammu and Kashmir, India.

---

## Acceptance of Terms

By accessing this website, making a donation, submitting a form, volunteering, or otherwise engaging with Tafheem-ul-Islam Trust, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.

---

## Contact Information

For questions regarding these Terms & Conditions, please contact:

**Tafheem-ul-Islam Trust**
Anantnag district, Jammu and Kashmir, India

**Email:** tafeemulislam524@gmail.com
**Phone:** +91 99068 22744

We appreciate your trust and support in helping us serve humanity with compassion, dignity, and responsibility.
`;

export function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Tafheem-ul-Islam Trust</title>
        <meta name="description" content="Terms & Conditions for Tafheem-ul-Islam Trust website usage." />
      </Helmet>
      <main className="flex-grow flex flex-col px-4 sm:px-6 lg:px-20 w-full mx-auto pt-4 md:pt-12 pb-12 md:pb-24">
        <div className="max-w-4xl w-full mx-auto bg-white border border-gray-200 rounded-[20px] md:rounded-[32px] p-6 md:p-16 shadow-sm">
          <div className="markdown-body">
            <Markdown>{termsMarkdown}</Markdown>
          </div>
        </div>
      </main>
    </>
  );
}