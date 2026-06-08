# Partner Tool — AI-Driven Health Diagnostic Assistant

<div class="flex flex-wrap gap-1 my-2">
<div class="badge badge-accent mb-4">TypeScript</div>
<div class="badge badge-accent mb-4">Next.js</div>
<div class="badge badge-accent mb-4">SST (Ion)</div>
<div class="badge badge-accent mb-4">AWS Lambda</div>
<div class="badge badge-accent mb-4">S3</div>
<div class="badge badge-accent mb-4">Polly</div>
<div class="badge badge-accent mb-4">AnomalyCo's SST framework</div>
<div class="badge badge-accent mb-4">TailwindCSS</div>
</div>

## Problem

The University of Southampton required a scalable, accessible voice-activated diagnostic tool and web scraper for individuals experiencing arthritic symptoms. The platform needed to deduplicate audio assets, support frequent inventory updates, and remain fully serverless and secure.

## Outcome

Built a fully serverless web application that generates or retrieves audio files for each diagnostic inventory item on demand, eliminating duplicate storage across users. The infrastructure-as-code approach (SST) dynamically passed AWS resource references to the web server environment, ensuring that no sensitive resource names were exposed client-side and that access controls were enforced at the infrastructure level. Provided ongoing support to the framework's open-source community on GitHub and Discord.

## Code Sample — Audio fetch with deduplication and secure S3 access

```typescript
export const fetchAudio = async ({ text, fileName }: fetchAudioProps) => {
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const bucketDomain = process.env.NEXT_PUBLIC_S3_BUCKET_DOMAIN;

  if (!bucketName) {
    if (!isProduction) console.error("Audio storage not found");
    return;
  }

  try {
    return await getAudio({ bucketDomain, bucketName, fileName });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (
      message.includes("NoSuchKey") ||
      message.includes("The specified key does not exist")
    ) {
      await generateAudio({ text: text || "", fileName, bucketName });
      return await getAudio({ bucketDomain, bucketName, fileName });
    }
    if (!isProduction) console.error("Error getting audio file: ", message);
  }
};
```
