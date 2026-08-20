import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout';

const sections = [
  { id: 'scope', title: 'Scope and acceptance' },
  { id: 'workspace', title: 'Workspace access and account security' },
  { id: 'research-briefs', title: 'Research briefs and questionnaires' },
  { id: 'respondent-protection', title: 'Respondent protection and data responsibilities' },
  { id: 'proposals', title: 'Proposals, fees, and project start' },
  { id: 'recruitment', title: 'Agreed recruitment support' },
  { id: 'data-ip', title: 'Data, intellectual property, and confidentiality' },
  { id: 'privacy-security', title: 'Privacy, security, and project requirements' },
  { id: 'availability', title: 'Availability and suspension' },
  { id: 'liability', title: 'Disclaimers and liability' },
  { id: 'changes-contact', title: 'Changes and contact' },
];

export default function BusinessResearcherTerms() {
  return (
    <LegalPageLayout
      eyebrow="Business researcher terms"
      title="Clear terms for considered research."
      intro="These terms apply when an organisation or independent researcher opens or uses a Guanyi Media business workspace, submits a research brief, creates a questionnaire, or asks us to support a research project."
      sections={sections}
      audience="For business workspace owners and authorised researchers"
    >
      <LegalSection number={1} id="scope" title="Scope and acceptance">
        <p>In these terms, “you” and “Client” mean the organisation or independent researcher using a business workspace. “Guanyi Media”, “we”, and “us” mean Guanyi Media. By creating a business workspace, submitting a brief, creating a questionnaire, accepting a proposal, or otherwise using business research services, you agree to these terms and the <a href="/privacy">Privacy Policy</a>.</p>
        <p>You confirm that you are authorised to act for the Client and to agree to these terms. A written proposal, order, or other project-specific agreement may add to or replace these terms for that project. If there is a conflict, the project-specific agreement controls for that conflict.</p>
      </LegalSection>

      <LegalSection number={2} id="workspace" title="Workspace access and account security">
        <p>You must keep account details accurate, maintain the confidentiality of your login credentials, and ensure that each person using the workspace is authorised by the Client. Do not share credentials or allow unauthorised access.</p>
        <p>Please contact us promptly at <a href="mailto:heguanyi@guanyi-media.com?subject=Business%20Workspace%20Security">heguanyi@guanyi-media.com</a> if you believe a workspace has been accessed without permission. We may take reasonable steps to protect the workspace while we review the report.</p>
      </LegalSection>

      <LegalSection number={3} id="research-briefs" title="Research briefs and questionnaires">
        <p>A business workspace helps you organise research briefs, questionnaire-design requests, proposals, project progress, and, where enabled, questionnaires for your own audience. It does not promise a particular method, sample size, completion rate, timeline, outcome, or research finding.</p>
        <p>You are responsible for the accuracy, completeness, and lawfulness of the material you provide, including the research purpose, questionnaire wording, recruitment criteria, incentives, and any instructions shown to respondents. You must not upload or request content that is unlawful, deceptive, discriminatory, exploitative, threatening, or infringes another person’s rights.</p>
        <p>We may review, decline, pause, or remove a brief, questionnaire, or public distribution link where it appears inconsistent with these terms, respondent protection, applicable requirements, or the agreed project scope.</p>
      </LegalSection>

      <LegalSection number={4} id="respondent-protection" title="Respondent protection and data responsibilities">
        <p>For a Client-created questionnaire, the Client decides the research purpose and how the results will be used. Before collecting responses, you must provide a clear purpose notice and obtain consent or another lawful basis whenever required. You are responsible for the study design, respondent communications, and any approvals required for your research.</p>
        <p>Do not use the workspace to collect passwords, verification or one-time codes, payment-card or bank details, government-issued identifiers, biometric identifiers, or other information that is unnecessary for the stated research. Do not collect sensitive personal information, information about children, or health, clinical, employment, or other high-impact information unless the collection is necessary, appropriately safeguarded, and permitted by applicable law and any required approvals have been obtained.</p>
        <p>You must not misrepresent the Client, the purpose of the research, participation requirements, incentives, or how responses will be used. If a questionnaire is distributed to your own audience, you are responsible for the audience, the distribution method, and the respondent notice.</p>
      </LegalSection>

      <LegalSection number={5} id="proposals" title="Proposals, fees, and project start">
        <p>After reviewing a brief, we may provide a proposal describing the proposed scope, deliverables, timing, assumptions, fees, and any project-specific terms. A proposal is not a commitment to begin a project until it is accepted in the agreed manner and any required funding or other start condition is confirmed.</p>
        <p>Unless a written project agreement says otherwise, changes to the audience, method, questionnaire, timing, or deliverables may require a revised scope, timing, or fee. Fees, payment timing, expenses, cancellation, and any refund treatment are governed by the applicable proposal or written project agreement, not by an assumption based on the workspace status.</p>
      </LegalSection>

      <LegalSection number={6} id="recruitment" title="Agreed recruitment support">
        <p>Where we agree in writing to support respondent recruitment or research delivery, that support is limited to the agreed project. We do not guarantee that any individual will qualify, participate, complete an activity, or provide a particular response.</p>
        <p>You may use participant information made available through an agreed project only for that project and only for the stated research purpose. You may not add participants to marketing lists, contact them outside the agreed project, sell or disclose their information, or attempt to identify an individual from de-identified research material unless a lawful and separately agreed arrangement permits it.</p>
      </LegalSection>

      <LegalSection number={7} id="data-ip" title="Data, intellectual property, and confidentiality">
        <p>As between the parties, the Client retains its rights in the materials it provides and, subject to applicable law and the rights of respondents, the research outputs made available for its project. You grant us a limited right to host, process, reproduce, and display those materials only as needed to operate the workspace and deliver the agreed services.</p>
        <p>We retain all rights in our platform, templates, methods, branding, and other materials that we provide independently of a Client project. Neither party may use the other party’s confidential information except to evaluate, provide, receive, or manage the services, or where disclosure is required by law. This does not restrict information that is already public through no breach, independently developed, or lawfully received without a duty of confidence.</p>
      </LegalSection>

      <LegalSection number={8} id="privacy-security" title="Privacy, security, and project requirements">
        <p>The <a href="/privacy">Privacy Policy</a> explains how we handle personal information. For a Client-created questionnaire, the Client is generally responsible for the research purpose and use of responses, while we process information to provide the hosted workspace and related services. Each party must meet the data-protection obligations that apply to its own activities.</p>
        <p>We use measures designed to protect the workspace and information processed through it. You must use the workspace only for lawful research and apply appropriate safeguards to any information you export or receive. If a project needs a specific data-processing, data-location, cross-border transfer, security, or regulatory arrangement, contact us before submitting the project; do not assume that a standard workspace meets that requirement.</p>
      </LegalSection>

      <LegalSection number={9} id="availability" title="Availability and suspension">
        <p>We may maintain, change, or discontinue workspace features as the service evolves. We may limit, pause, or suspend access where reasonably necessary to protect people, the service, or legal rights, to investigate suspected misuse, or to address a breach of these terms. Where appropriate, we will explain the reason and the available next step.</p>
        <p>On request, we will consider reasonable access to Client materials and research outputs that remain available in the workspace, subject to the applicable project terms, legal obligations, security, and technical limits.</p>
      </LegalSection>

      <LegalSection number={10} id="liability" title="Disclaimers and liability">
        <p>The workspace and research services are provided on an “as available” basis to the extent permitted by law. Research involves human judgment and variable participation; we do not warrant that the service will be uninterrupted or that any research result will be complete, accurate, representative, or suitable for a particular decision.</p>
        <p>To the extent permitted by law, neither party is liable to the other for indirect, incidental, special, consequential, or punitive damages. Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited, and nothing limits any rights that applicable law gives to an individual.</p>
      </LegalSection>

      <LegalSection number={11} id="changes-contact" title="Changes and contact">
        <p>We may update these terms to reflect changes to the service, research practices, or legal requirements. For material changes, we will provide notice through the workspace, by email, or by another reasonable method before the revised terms take effect where required.</p>
        <p>Questions about these terms or a business research project can be sent to <a href="mailto:heguanyi@guanyi-media.com?subject=Business%20Researcher%20Terms">heguanyi@guanyi-media.com</a>.</p>
      </LegalSection>
    </LegalPageLayout>
  );
}
