# Resend email

This project sends transactional email through Payload's official `@payloadcms/email-resend` adapter when all four Resend environment variables are present. Contact-form submissions create a business notification; the recipient falls back to `RESEND_TO_ADDRESS` and the sender falls back to the configured Resend sender.

For example, a contact form submission from `visitor@example.com` sends a notification to `RESEND_TO_ADDRESS`, from `RESEND_FROM_NAME <RESEND_FROM_ADDRESS>`, with Reply-To set to `visitor@example.com`.

## Client handoff

1. The client creates and owns their Resend account.
2. The client adds their sending domain in Resend and completes its DNS verification.
3. The client creates a Resend API key and supplies it through the agreed secure channel.
4. Add the following production environment variables in the deployment platform, then redeploy:

   ```env
   RESEND_API_KEY=re_...
   RESEND_FROM_ADDRESS=notifications@example.com
   RESEND_FROM_NAME=Example Business
   RESEND_TO_ADDRESS=team@example.com
   ```

5. Submit the contact form and confirm delivery and Reply-To behavior.

The API key remains server-only: do not add a `NEXT_PUBLIC_` prefix, commit it, or paste it into client-side code.

## Before a Resend domain is ready

Resend is deliberately optional. Until the client has supplied all four variables above, Payload uses its built-in console email adapter instead. A contact form submission is still validated, stored, and shown its normal confirmation message; it simply does not deliver email. This also applies when only some of the four variables are configured, preventing an incomplete setup from calling Resend with invalid credentials or an unverified sender.

## Form-builder behavior and limitations

The seeded contact form intentionally leaves **Email To** and **Email From** empty. Payload form builder therefore uses `RESEND_TO_ADDRESS`; the Resend adapter uses `RESEND_FROM_NAME` and `RESEND_FROM_ADDRESS`. This avoids baking an unverified sender or a client inbox into seeded data. An editor can set **Email To** on an individual form to override the fallback; it should still leave **Email From** blank unless it is an approved, verified sender.

Existing forms already stored in the database are not changed by a seed-file edit. Update their Email settings in Payload admin, or reseed a non-production database, before expecting the new notification behavior.

Resend cannot send production mail from an unverified sender domain. DNS verification and API-key ownership are external Resend-account responsibilities; changing any of the four environment variables requires a redeploy. Payload records form submissions even when the email provider rejects delivery, and the form-builder plugin logs sending errors instead of returning them to the visitor, so use Resend's delivery activity and application logs when testing failures.
