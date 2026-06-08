# Navy — AI-Powered Cross-Platform Mobile Application

<div class="flex flex-wrap gap-1 my-2">
<div class="badge badge-primary mb-4">React Native</div>
<div class="badge badge-primary mb-4">Expo</div>
<div class="badge badge-primary mb-4">AWS Lambda</div>
<div class="badge badge-primary mb-4">SST</div>
<div class="badge badge-primary mb-4">Stripe</div>
<div class="badge badge-primary mb-4">Twilio</div>
<div class="badge badge-primary mb-4">Google Cloud APIs</div>
<div class="badge badge-primary mb-4">Sentry</div>
<div class="badge badge-primary mb-4">GitHub Actions</div>
</div>

## Problem

A stealth startup needed a production-grade mobile application that could handle complex user interactions, secure payments, and real-time AI-driven features, while maintaining a rapid development cycle across iOS and Android.

## Outcome

Delivered a serverless, automatically deployed application with segregated CI/CD pipelines per platform, reducing release friction. The system serves two distinct user types (organisation accounts and personal accounts) with context-aware AI responses, all through highly secure Lambda endpoints. The client is projecting several million GBP in revenue over five years.

## Code Sample — Automated CI/CD with Expo EAS

The CI/CD pipeline uses commit-message triggers to selectively build for iOS, Android, or both, and automatically submits to app stores from the `main` branch:

```yaml
# .github/workflows/eas-build.yml (excerpt)
jobs:
  build_ios:
    name: Build iOS
    if: ${{ contains(github.commit_message, '[ios]') || contains(github.commit_message, '[native]') }}
    environment: ${{ github.ref_name == 'main' && 'production' || 'preview' }}
    type: build
    params:
      platform: ios
      profile: ${{ github.ref_name == 'main' && 'production' || 'preview' }}
  build_android:
    name: Build Android
    if: ${{ contains(github.commit_message, '[android]') || contains(github.commit_message, '[native]') }}
    environment: ${{ github.ref_name == 'main' && 'production' || 'preview' }}
    type: build
    params:
      platform: android
      profile: ${{ github.ref_name == 'main' && 'production' || 'preview' }}
  submit_android:
    name: Submit Android Build
    needs: [build_android]
    type: submit
    params:
      build_id: ${{ needs.build_android.outputs.build_id }}
      profile: ${{ github.ref_name == 'main' && 'production' || 'preview' }}
  submit_ios:
    name: Submit iOS Build
    needs: [build_ios]
    type: submit
    params:
      build_id: ${{ needs.build_ios.outputs.build_id }}
      profile: ${{ github.ref_name == 'main' && 'production' || 'preview' }}
```
