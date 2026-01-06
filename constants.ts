import { Course, Lesson } from './types';

const WEB_MANAGEMENT_COURSE: Course = {
  id: 'web-arch-v1',
  title: 'Web Management & Architecture',
  description: 'Master the essential concepts of building and managing robust, scalable modern websites, from frontend to backend.',
  price: 49.99,
  lessons: [
    {
      id: 'L1',
      title: 'Intro to Web Architecture',
      duration: 20,
      content: `
Welcome to 'Web Management & Architecture' by Egreed Technology!
This course will guide you through the essential concepts of building and managing modern websites.

What is Web Architecture?
Web architecture refers to the conceptual structure of the World Wide Web. On a smaller scale, it's the plan and design of a website's components and how they interact. This includes the client-side (what you see in your browser), the server-side (where data is stored and processed), and the network communication between them.

Key Architectural Patterns:
- Client-Server Model: The fundamental model where a client (your browser) requests resources from a server, which processes the request and sends a response back.
- 3-Tier Architecture: A popular model that separates applications into three logical tiers: the presentation tier (UI), the application tier (business logic), and the data tier (database).
- Monolith vs. Microservices: A monolith is an application built as a single, unified unit. Microservices architecture structures an application as a collection of loosely coupled, independently deployable services. Each has its pros and cons regarding development complexity, scalability, and maintenance.

Understanding these foundational concepts is the first step to designing robust and scalable web applications.
`
    },
    {
      id: 'L2',
      title: 'Modern Frontend Development',
      duration: 25,
      content: `
The frontend is everything the user sees and interacts with in their browser. It's the 'presentation tier' of our architecture.

The Building Blocks:
Every website is built on three core technologies:
- HTML (HyperText Markup Language): Provides the fundamental structure and content of a webpage.
- CSS (Cascading Style Sheets): Used to style the HTML content, controlling layout, colors, and fonts.
- JavaScript (JS): A programming language that enables interactive and dynamic features on a webpage.

Frontend Frameworks:
To build complex applications efficiently, developers often use frameworks. These provide pre-written code and structures to solve common problems.
- React: A library developed by Facebook for building user interfaces, known for its component-based architecture and performance.
- Angular: A comprehensive framework by Google that provides a more opinionated structure for building large-scale applications.
- Vue: A progressive framework that is known for its approachability and flexibility, making it easy to adopt.

These frameworks have enabled the rise of Single Page Applications (SPAs), which load a single HTML page and dynamically update content as the user interacts with the app, providing a smoother, more app-like experience.
`
    },
    {
      id: 'L3',
      title: 'Backend Technologies & APIs',
      duration: 25,
      content: `
The backend is the server-side of a web application. It's the engine room that powers the frontend.

What does the backend do?
The backend is responsible for storing and organizing data, processing business logic, and handling user authentication and authorization. It receives requests from the frontend and sends back the appropriate data.

Core Components:
- Server-Side Languages: Code that runs on the server. Popular choices include Node.js (which allows using JavaScript on the backend), Python (with frameworks like Django or Flask), Ruby (with Ruby on Rails), and Java.
- Databases: Where application data is stored. They come in two main types:
    - SQL (Relational): Organize data in tables with predefined schemas (e.g., PostgreSQL, MySQL).
    - NoSQL (Non-relational): Offer more flexible data models, like document stores or key-value pairs (e.g., MongoDB, Redis).

APIs (Application Programming Interfaces):
APIs are the contracts that allow the frontend and backend to communicate. They define the rules for how to request and exchange data.
- REST (Representational State Transfer): A widely used architectural style for designing networked applications, using standard HTTP methods (GET, POST, PUT, DELETE).
- GraphQL: A query language for APIs developed by Facebook. It allows clients to request exactly the data they need, which can be more efficient than REST.
`
    },
    {
      id: 'L4',
      title: 'From Clicks to Customers',
      duration: 15,
      content: `
A technically sound website is only half the battle. Its ultimate goal is often to drive business results. How do you turn visitors into loyal customers?

The Business Role of a Website:
Your website is a critical tool for conversion. Whether it's making a sale, generating a lead, or getting a sign-up, every element should guide the user toward a desired action.

Key Strategies for Conversion:
- User Experience (UX): A site must be intuitive, easy to navigate, and pleasant to use. A poor UX will cause visitors to leave.
- Call to Action (CTA): Clear, compelling prompts (like "Buy Now", "Sign Up Free", "Contact Us Today!") are essential for telling users what to do next.
- Data-Driven Solutions: Getting clicks but no sales? You need to analyze user behavior. Tools like Google Analytics help you understand where users are dropping off. This data allows you to create high-performing ads and tailored strategies.
- A/B Testing: Test different versions of a page, headline, or button to see which one performs better. This is a core part of Conversion Rate Optimization (CRO).

From engagement to sales, every click should count. By focusing on these principles, you can turn your website into a powerful engine for business growth. Let’s grow your business—contact us today!
`
    }
  ]
};

const CLOUD_COMPUTING_COURSE: Course = {
  id: 'cloud-comp-v1',
  title: 'Introduction to Cloud Computing',
  description: 'Learn the fundamentals of cloud computing, including service models (IaaS, PaaS, SaaS) and major cloud providers.',
  price: 29.99,
  lessons: [
    {
      id: 'CC1',
      title: 'What is the Cloud?',
      duration: 15,
      content: `Welcome to 'Introduction to Cloud Computing'!
      
What is Cloud Computing?
Cloud computing is the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers and servers, you can access technology services, such as computing power, storage, and databases, on an as-needed basis from a cloud provider like Amazon Web Services (AWS), Google Cloud, and Microsoft Azure.

Key Characteristics:
- On-demand self-service: Users can provision computing capabilities without requiring human interaction with each service provider.
- Broad network access: Capabilities are available over the network and accessed through standard mechanisms.
- Resource pooling: The provider's computing resources are pooled to serve multiple consumers using a multi-tenant model.
- Rapid elasticity: Capabilities can be elastically provisioned and released, in some cases automatically, to scale rapidly outward and inward commensurate with demand.
- Measured service: Cloud systems automatically control and optimize resource use by leveraging a metering capability.
`
    },
    {
      id: 'CC2',
      title: 'Cloud Service Models',
      duration: 20,
      content: `Cloud computing services are broken down into three main categories or service models.
        
IaaS (Infrastructure as a Service):
This is the most basic category. With IaaS, you rent IT infrastructure—servers and virtual machines (VMs), storage, networks, operating systems—from a cloud provider on a pay-as-you-go basis. It's like leasing the hardware for your virtual data center.
Example Providers: Amazon EC2, Google Compute Engine.

PaaS (Platform as a Service):
PaaS refers to cloud computing services that supply an on-demand environment for developing, testing, delivering, and managing software applications. PaaS is designed to make it easier for developers to quickly create web or mobile apps, without worrying about setting up or managing the underlying infrastructure.
Example Providers: Heroku, Google App Engine.

SaaS (Software as a Service):
SaaS is a method for delivering software applications over the Internet, on demand and typically on a subscription basis. With SaaS, cloud providers host and manage the software application and underlying infrastructure and handle any maintenance, like software upgrades and security patching.
Example Providers: Google Workspace, Salesforce, Dropbox.
`
    },
  ]
};

const HTML_CSS_COURSE: Course = {
    id: 'html-css-v1',
    title: 'Basics of HTML & CSS',
    description: 'A perfect starting point! Learn the two foundational languages of the web to build and style your very first web pages.',
    price: 0,
    lessons: [
        {
            id: 'HC1',
            title: 'Your First HTML Page',
            duration: 15,
            content: `Welcome to the world of web development!
            
What is HTML?
HTML stands for HyperText Markup Language. It's the standard language used to create the structure and content of web pages. Think of it as the skeleton of a website.

Anatomy of an HTML Tag:
HTML is made up of elements, which are represented by tags. A tag is usually composed of an opening tag, content, and a closing tag. For example: \`<p>This is a paragraph.</p>\`
- \`<p>\` is the opening tag.
- "This is a paragraph." is the content.
- \`</p>\` is the closing tag.

Your First Page:
Let's look at a basic HTML document structure:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first website.</p>
</body>
</html>
\`\`\`
- \`<!DOCTYPE html>\` declares that this is an HTML5 document.
- \`<html>\` is the root element.
- \`<head>\` contains meta-information about the page (like the title).
- \`<body>\` contains the visible content of the page.
- \`<h1>\` is a top-level heading.
- \`<p>\` is a paragraph.
            `
        },
        {
            id: 'HC2',
            title: 'Styling with CSS',
            duration: 20,
            content: `Now that we have a skeleton, let's add some style!

What is CSS?
CSS stands for Cascading Style Sheets. It's the language used to describe the presentation and styling of an HTML document. It controls colors, fonts, layout, and more.

How to Apply CSS:
There are three main ways to add CSS to an HTML document:
1. Inline: Using the \`style\` attribute directly on an HTML element. (e.g., \`<p style="color: blue;">\`)
2. Internal: Placing CSS rules inside a \`<style>\` tag within the HTML \`<head>\`.
3. External: Linking to a separate \`.css\` file. This is the most common and recommended method for larger projects.

Basic CSS Syntax:
A CSS rule consists of a selector and a declaration block.
\`\`\`css
selector {
  property: value;
}
\`\`\`
For example, to make all paragraphs red:
\`\`\`css
p {
  color: red;
  font-size: 16px;
}
\`\`\`
This rule selects all \`<p>\` elements and applies the specified styles to them. By combining HTML and CSS, you can create visually appealing and well-structured websites.
`
        }
    ]
};

const generatePlaceholderCourses = (): Course[] => {
    const courses: Course[] = [];
    const subjects = ['Python', 'JavaScript', 'Data Science', 'Machine Learning', 'Cybersecurity', 'DevOps', 'Go', 'Rust', 'UI/UX Design', 'Project Management', 'Quantum Computing', 'Blockchain'];
    const levels = ['Introduction to', 'Advanced', 'Mastering', 'The Ultimate Guide to', 'Essentials of', 'Deep Dive into'];
    const descriptions = [
        'A comprehensive course covering all the fundamental and advanced topics to kickstart your career.',
        'Unlock your potential with this in-depth guide, packed with hands-on projects and real-world examples.',
        'Learn from industry experts and gain the skills needed to excel in this fast-growing field.',
        'This course provides the solid foundation you need for success, from basic principles to complex applications.'
    ];

    for (let i = 0; i < 100; i++) {
        const subject = subjects[i % subjects.length];
        const level = levels[i % levels.length];
        const title = `${level} ${subject}`;
        const lessonCount = 3 + (i % 7);
        const lessons: Lesson[] = [];

        for(let j=0; j<lessonCount; j++){
            lessons.push({
                id: `PGC-L${j+1}`,
                title: `Lesson ${j+1}: Getting Started with ${subject}`,
                duration: 15 + (j*5),
                content: `This is placeholder content for ${title}. In a real course, this lesson would cover key topic number ${j+1}.`
            });
        }
        
        courses.push({
            id: `placeholder-course-${i}`,
            title,
            description: descriptions[i % descriptions.length],
            price: (i % 4 === 0) ? 0 : parseFloat((19.99 + (i % 10) * 5).toFixed(2)),
            lessons: lessons
        });
    }
    return courses;
};


const handcraftedCourses: Course[] = [
  WEB_MANAGEMENT_COURSE,
  CLOUD_COMPUTING_COURSE,
  HTML_CSS_COURSE,
];

export const COURSES: Course[] = [
    ...handcraftedCourses,
    ...generatePlaceholderCourses()
];