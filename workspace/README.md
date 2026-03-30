# Bailey Cross - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Stack**: Built with Next.js 16.2, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with responsive navigation
- **SEO Optimized**: Proper metadata and semantic HTML structure
- **Fast Loading**: Static site generation for optimal performance
- **Portfolio Sections**:
  - Home: Introduction and overview
  - About Me: Background, journey, and skills
  - Projects: Showcase of development work
  - Hobbies: Personal interests and activities

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/page.tsx     # About page
│   │   ├── projects/page.tsx  # Projects showcase
│   │   ├── hobbies/page.tsx   # Hobbies and interests
│   │   ├── layout.tsx         # Root layout with navigation
│   │   └── page.tsx           # Home page
│   └── components/            # Reusable components
│       └── Navigation.tsx     # Main navigation component
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
└── tailwind.config.ts        # Tailwind CSS configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd workspace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the website

### Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🚀 Deployment

### For Ubuntu/Debian Home Server

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm run start
   # Server will run on http://localhost:3000
   ```

3. **Using PM2 for process management** (recommended):
   ```bash
   npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   pm2 startup  # Enable auto-restart on server reboot
   pm2 save
   ```

4. **Nginx reverse proxy** (optional):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 📝 Customization

### Content Updates

1. **Personal Information**: Edit the name and details in:
   - `src/app/page.tsx` (hero section)
   - `src/components/Navigation.tsx` (brand name)
   - `src/app/layout.tsx` (metadata)

2. **About Page**: Update `src/app/about/page.tsx` with your background and skills

3. **Projects**: Modify the projects array in `src/app/projects/page.tsx`

4. **Hobbies**: Update the hobbies array in `src/app/hobbies/page.tsx`

### Styling

- **Colors**: Modify color scheme in `tailwind.config.ts`
- **Components**: Update styling in individual component files
- **Global styles**: Edit `src/app/globals.css`

## 🔧 Technology Stack

- **Framework**: Next.js 16.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm
- **Deployment**: Static site generation ready

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Bailey Cross - [Your Contact Information]

Project Link: [https://github.com/your-username/portfolio](https://github.com/your-username/portfolio)
