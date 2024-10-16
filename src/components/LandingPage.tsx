import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">MindForge</h1>
        <nav>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/signup"><Button>Sign Up</Button></Link>
        </nav>
      </header>
      <main className="container mx-auto mt-20 text-center">
        <h2 className="text-5xl font-bold mb-6">Forge Your Mind, Master Any Subject</h2>
        <p className="text-xl mb-10">Adaptive learning powered by AI. Study smarter, not harder.</p>
        <Link to="/signup"><Button size="lg">Get Started for Free</Button></Link>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-4">AI-Powered Learning</h3>
            <p>Our AI tutor adapts to your learning style and pace.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Gamified Experience</h3>
            <p>Earn points, unlock achievements, and compete with friends.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Virtual Classrooms</h3>
            <p>Join live sessions with tutors and fellow learners.</p>
          </div>
        </div>
      </main>
    </div>
  );
};