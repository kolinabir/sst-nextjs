# 📸 Image Gallery with SST

A modern, full-stack image gallery application built with **Next.js**, **SST (Serverless Stack)**, and **AWS S3**. Upload, store, and display images with a beautiful, responsive interface.

## ✨ Features

- 🚀 **Serverless Architecture** - Built with SST for scalable AWS deployment
- 📤 **File Upload** - Direct upload to AWS S3 with pre-signed URLs
- 🖼️ **Image Gallery** - Beautiful grid layout with hover effects
- 📱 **Responsive Design** - Works perfectly on mobile and desktop
- ⚡ **Real-time Updates** - See new uploads instantly
- 🔒 **Secure** - No AWS credentials stored in client code
- 🎨 **Modern UI** - Built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: SST (Serverless Stack Toolkit)
- **Cloud**: AWS (S3, Lambda, CloudFront)
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

1. **Node.js** 18+ and **pnpm**
2. **AWS CLI** configured with your credentials
3. **SST CLI** (will be installed automatically)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd my-nextjs-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure AWS Credentials**

   ```bash
   # Install AWS CLI
   brew install awscli

   # Configure your AWS credentials
   aws configure
   ```

4. **Set up IAM permissions**

   - Go to AWS IAM Console
   - Create a user with `AWSAppSyncInvokeFullAccess` policy
   - Or use the minimal policy provided in the troubleshooting section

5. **Initialize SST**

   ```bash
   # This sets up your AWS resources
   npx sst dev
   ```

6. **Access your application**
   - SST will display your app URL (e.g., `https://xxx.cloudfront.net`)
   - Open that URL in your browser

## 📋 Available Scripts

```bash
# Development mode (recommended)
pnpm sst dev

# Production deployment
pnpm sst deploy --stage production

# Remove all resources
pnpm sst remove

# Check what's going to be deployed
pnpm sst diff
```

## 🔧 Configuration

### SST Configuration (`sst.config.ts`)

The app is configured to use:

- **AWS S3** for file storage
- **AWS Lambda** for serverless functions
- **AWS CloudFront** for CDN distribution

### Environment Variables

No `.env` file needed! SST handles AWS credentials and resource linking automatically.

## 🐛 Troubleshooting

### Common Issues

1. **"AWS credentials not configured"**

   ```bash
   aws configure
   ```

2. **"Access denied" errors**

   - Ensure your IAM user has these policies:
     - `AWSAppSyncInvokeFullAccess`
     - `AmazonS3FullAccess`
     - `AWSCloudFormationFullAccess`
     - `AmazonSSMFullAccess`

3. **Upload not working**

   - Check browser console for CORS errors
   - Ensure S3 bucket allows public access
   - Verify the pre-signed URL is generated correctly

4. **Images not showing in gallery**
   - Check that signed URLs are being generated
   - Verify S3 bucket contains the uploaded files
   - Check browser network tab for failed requests

### Debug Mode

```bash
# Run with verbose logging
DEBUG=* npx sst dev

# Check SST logs
cat .sst/log/sst.log
```

## 📁 Project Structure

```
my-nextjs-app/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page with gallery
│   │   └── layout.tsx        # App layout
│   ├── component/
│   │   ├── form.tsx          # Upload form component
│   │   └── image-gallery.tsx # Image display component
│   └── styles/
│       └── globals.css       # Global styles
├── sst.config.ts             # SST configuration
├── package.json
└── README.md
```

## 🚀 Deployment

### Development

```bash
pnpm sst dev
```

- Deploys to AWS with live updates
- Console available at the provided URL

### Production

```bash
pnpm sst deploy --stage production
```

- Creates production-ready deployment
- Optimized for performance and cost

## 🔒 Security

- **No AWS credentials** stored in code or environment variables
- **Pre-signed URLs** expire after 1 hour
- **CORS properly configured** for cross-origin requests
- **Input validation** on file types and sizes

## 📚 Learn More

- [SST Documentation](https://sst.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
