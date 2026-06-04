‎Act as an expert WebGL developer and UI/UX designer You are building a premium, scalable, easy-to-edit 3D freelancer portfolio website.
‎
‎GOAL Create a modern 3D portfolio website for a freelancer/studio that showcases:
‎
‎who we are
‎
‎what we do
‎
‎how we work
‎
‎our projects
‎
‎our services
‎
‎our clients
‎
‎testimonials
‎
‎contact details
‎
‎call-to-action for lead generation
‎
‎
‎The site must feel premium, cinematic, and memorable, but also be fast, responsive, accessible, SEO-friendly, and very easy to edit later.
‎
‎PRIMARY REQUIREMENTS
‎
‎1. The entire website must be content-driven and easy to update.
‎
‎
‎2. All key content must be stored in a structured, editable source such as:
‎
‎CMS collections, or
‎
‎JSON/MDX/content files with a clear schema, or
‎
‎a headless CMS integration if you judge that best.
‎
‎
‎
‎3. The structure must support future growth:
‎
‎adding new projects
‎
‎adding new services
‎
‎adding new clients
‎
‎adding testimonials
‎
‎editing contact details
‎
‎adding future case studies or team members
‎
‎
‎
‎4. The site must have a strong 3D and motion design language, but must remain usable and not slow.
‎
‎
‎5. It must be production-ready, cleanly architected, and easy for a non-expert to maintain.
‎
‎
‎
‎TECH STACK Build this with a modern production-ready stack:
‎
‎Next.js App Router
‎
‎TypeScript
‎
‎Tailwind CSS
‎
‎shadcn/ui for components
‎
‎Framer Motion for motion
‎
‎Three.js or React Three Fiber for 3D scenes
‎
‎Zustand or a similarly lightweight state solution only if needed
‎
‎Zod for validation if needed
‎
‎SEO best practices
‎
‎Responsive design
‎
‎Deployment-ready structure
‎
‎
‎If you believe a CMS is the best way to make editing easy, choose a practical CMS solution and implement it cleanly with a simple content editing workflow.
‎
‎DESIGN DIRECTION Create a premium “future studio / digital agency / independent creator” style:
‎
‎dark elegant theme
‎
‎subtle neon or gradient accents
‎
‎glassmorphism only where useful
‎
‎large typography
‎
‎cinematic spacing
‎
‎smooth transitions
‎
‎interactive 3D hero scene
‎
‎polished hover states
‎
‎visually rich but uncluttered layout
‎
‎
‎The design should communicate:
‎
‎trust
‎
‎creativity
‎
‎technical capability
‎
‎speed
‎
‎professionalism
‎
‎premium quality
‎
‎
‎SITE STRUCTURE Build a one-page or multi-section landing site with these sections:
‎
‎1. Hero
‎
‎
‎
‎strong headline
‎
‎short value proposition
‎
‎2 CTA buttons: “View Projects” and “Contact Us”
‎
‎3D animated centerpiece
‎
‎quick trust signals
‎
‎
‎2. About / Who We Are
‎
‎
‎
‎short introduction
‎
‎what kind of work we do
‎
‎what makes us different
‎
‎
‎3. Services
‎
‎
‎
‎clear list of services with icons or visual cards
‎
‎each service should explain:
‎
‎what it is
‎
‎what problem it solves
‎
‎typical deliverables
‎
‎
‎services must be easy to edit from content source
‎
‎
‎4. Projects / Portfolio
‎
‎
‎
‎show projects as featured case studies
‎
‎include:
‎
‎project title
‎
‎category
‎
‎brief summary
‎
‎challenge
‎
‎solution
‎
‎result
‎
‎tools used
‎
‎visuals
‎
‎
‎the section should look premium and interactive
‎
‎allow future filtering by category if possible
‎
‎
‎5. Clients
‎
‎
‎
‎client logos or client list
‎
‎optional industry labels
‎
‎small trust-focused presentation
‎
‎
‎6. Testimonials
‎
‎
‎
‎short, believable testimonials
‎
‎easy to swap or add more
‎
‎
‎7. How We Work
‎
‎
‎
‎a process section that explains the workflow: Discover → Plan → Design → Build → Test → Launch → Support
‎
‎make this visually engaging and easy to understand
‎
‎
‎8. Contact
‎
‎
‎
‎contact form
‎
‎contact email / phone / social links
‎
‎location or timezone if relevant
‎
‎clear “book a call” style CTA
‎
‎form validation
‎
‎success and error states
‎
‎
‎9. Footer
‎
‎
‎
‎copyright
‎
‎social links
‎
‎quick navigation
‎
‎small professional closing line
‎
‎
‎3D / MOTION REQUIREMENTS The site must feel 3D, but the 3D must serve the content. Use 3D in at least these places:
‎
‎hero centerpiece
‎
‎section transitions or scroll effects
‎
‎project showcase or card presentation
‎
‎subtle background depth
‎
‎
‎The 3D experience should:
‎
‎be smooth
‎
‎not block content
‎
‎degrade gracefully on low-power devices
‎
‎respect reduced-motion preferences
‎
‎stay responsive on mobile
‎
‎
‎CONTENT MANAGEMENT REQUIREMENTS Make the content editable without touching UI code every time. Structure the content so that these fields can be updated easily:
‎
‎site metadata
‎
‎hero title/subtitle
‎
‎services list
‎
‎projects list
‎
‎clients list
‎
‎testimonials
‎
‎contact details
‎
‎social links
‎
‎CTA buttons
‎
‎SEO data
‎
‎
‎Use clear schemas and reusable components so new content can be added without rewriting the UI.
‎
‎ARCHITECTURE REQUIREMENTS Follow a modular architecture:
‎
‎reusable components
‎
‎separate content layer
‎
‎separate UI layer
‎
‎separate data schema/types
‎
‎clean folder structure
‎
‎no hardcoded repeated content
‎
‎no unnecessary complexity
‎
‎keep it easy to scale into a larger agency website later
‎
‎
‎PERFORMANCE REQUIREMENTS Optimize for:
‎
‎fast first load
‎
‎efficient 3D rendering
‎
‎image optimization
‎
‎lazy loading for heavy elements
‎
‎code splitting where needed
‎
‎good Lighthouse performance
‎
‎
‎SEO / ACCESSIBILITY REQUIREMENTS Implement:
‎
‎semantic HTML
‎
‎proper headings
‎
‎meta tags
‎
‎Open Graph data
‎
‎Twitter card data
‎
‎alt text for images
‎
‎keyboard navigation
‎
‎accessible contrast
‎
‎reduced motion support
‎
‎mobile usability
‎
‎
‎DELIVERABLES Build the full project with:
‎
‎1. clean production-ready code
‎
‎
‎2. a clear folder structure
‎
‎
‎3. reusable components
‎
‎
‎4. editable content architecture
‎
‎
‎5. polished responsive design
‎
‎
‎6. working 3D interactions
‎
‎
‎7. complete contact section
‎
‎
‎8. example content for a freelancer portfolio
‎
‎
‎9. README with setup and editing instructions
‎
‎
‎
‎WORKING STYLE Before coding:
‎
‎inspect the requirements
‎
‎propose the architecture briefly
‎
‎define the content model
‎
‎then implement in phases
‎
‎
‎Implementation phases: Phase 1: scaffold the project Phase 2: build the design system and layout Phase 3: implement the 3D hero and motion Phase 4: implement services, projects, clients, testimonials, and contact Phase 5: connect the content layer / CMS or content files Phase 6: polish responsiveness, SEO, and accessibility Phase 7: test and fix issues Phase 8: document the project clearly
‎
‎IMPORTANT PRODUCT GOALS The final website must make a visitor feel:
‎
‎this studio is real
‎
‎this studio is skilled
‎
‎this studio understands business
‎
‎this studio can execute premium work
‎
‎this studio is worth contacting
‎
‎
‎ACCEPTANCE CRITERIA Do not finish until:
‎
‎the site runs without errors
‎
‎all sections are present
‎
‎content is editable from the chosen content source
‎
‎the 3D hero works
‎
‎the site is responsive
‎
‎contact section works
‎
‎components are reusable
‎
‎the code is clean and understandable
‎
‎the site looks premium
‎
‎
‎START NOW First, generate the architecture plan and folder structure. Then implement the project step by step. Make sensible decisions without asking unnecessary questions. If anything is ambiguous, choose the option that best fits a premium scalable freelancer portfolio.
‎
‎