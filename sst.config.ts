// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "my-nextjs-app",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    // Create a bucket
    const bucket = new sst.aws.Bucket("MyBucket", {
      access: "public",
    });

    new sst.aws.Nextjs("MyWeb", {
      link: [bucket],
    });
  },
});
