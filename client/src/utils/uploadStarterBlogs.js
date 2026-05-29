import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

import { db } from "../firebase";

// ===================================
// STARTER BLOGS
// ===================================

const starterBlogs = [

{
  title: "The Future of Artificial Intelligence in Everyday Life",
  category: "Artificial Intelligence",
  image: "/blogs/ai.jpg",
  author: "Sophia Carter",
  role: "AI Research Writer",
  readTime: "12 min read",
  likes: 124,
  comments: [],
  description:
    "Explore how AI is transforming healthcare, education, business, and everyday digital experiences.",
  content: `
# Introduction

Artificial Intelligence is rapidly transforming the modern world.

## AI In Healthcare

Healthcare systems now use AI to detect diseases earlier and improve patient outcomes.

## AI In Education

Education platforms are becoming more adaptive and personalized.

## Business Transformation

Businesses use AI for automation, customer support, predictive analytics, and security systems.

# Conclusion

Artificial Intelligence will continue shaping society.
`
},

{
  title: "Modern Cloud Computing Architecture Explained",
  category: "Cloud Computing",
  image: "/blogs/cloud.jpg",
  author: "Daniel Brooks",
  role: "Cloud Solutions Architect",
  readTime: "13 min read",
  likes: 94,
  comments: [],
  description:
    "Understand cloud-native systems, scalability, containers, and distributed infrastructure.",
  content: `
# Introduction

Cloud computing powers modern digital infrastructure.

## Containers And Kubernetes

Containers package applications consistently across environments.

## Serverless Computing

Serverless systems allow developers to focus only on application logic.

# Conclusion

Cloud computing continues to evolve rapidly.
`
},

{
  title: "Why Clean Code Matters For Developers",
  category: "Programming",
  image: "/blogs/coding.jpg",
  author: "James Wilson",
  role: "Senior Software Engineer",
  readTime: "12 min read",
  likes: 88,
  comments: [],
  description:
    "Learn why writing maintainable and readable code is essential for software engineering success.",
  content: `
# Introduction

Clean code improves maintainability and collaboration.

## Readability

Readable code is easier to debug and improve.

## Team Collaboration

Clean code improves teamwork across engineering departments.

# Conclusion

Good software requires clarity and maintainability.
`
},

{
  title: "The Rise of Full Stack Web Development",
  category: "Web Development",
  image: "/blogs/webdevelopment.jpg",
  author: "Emma Richardson",
  role: "Frontend Engineer",
  readTime: "14 min read",
  likes: 102,
  comments: [],
  description:
    "Explore the technologies powering modern responsive and scalable web applications.",
  content: `
# Introduction

Full stack development combines frontend and backend engineering.

## Frontend Technologies

React and modern frameworks simplify UI development.

## Backend Technologies

Node.js enables scalable APIs and real-time systems.

# Conclusion

Full stack development remains one of the most valuable technical skills today.
`
},

{
  title: "Machine Learning And The Next Digital Revolution",
  category: "Machine Learning",
  image: "/blogs/machinelearning.jpg",
  author: "Olivia Bennett",
  role: "ML Engineer",
  readTime: "15 min read",
  likes: 131,
  comments: [],
  description:
    "Discover how machine learning systems learn patterns and drive intelligent automation.",
  content: `
# Introduction

Machine learning enables systems to learn from data.

## Neural Networks

Deep learning uses layered neural networks.

## Industry Applications

ML is widely used in healthcare, finance, and robotics.

# Conclusion

Machine learning is shaping the future of intelligent systems.
`
}

];

// ===================================
// UPLOAD FUNCTION
// ===================================

const uploadStarterBlogs = async () => {

  const snapshot =
    await getDocs(
      collection(db, "blogs")
    );

  const existingTitles =
    snapshot.docs.map(
      (doc) => doc.data().title
    );

  let uploadedCount = 0;

  for (const blog of starterBlogs) {

    if (
      existingTitles.includes(blog.title)
    ) {
      continue;
    }

    await addDoc(
      collection(db, "blogs"),
      {
        ...blog,
        createdAt:
          new Date().toISOString(),
      }
    );

    uploadedCount++;
  }

  if (uploadedCount === 0) {

    alert("Starter blogs already uploaded");

    return;
  }

  alert(
    `${uploadedCount} starter blogs uploaded successfully`
  );

  window.location.reload();
};

export default uploadStarterBlogs;