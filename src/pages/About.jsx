import React from 'react';

const About = () => {
  return (
    <main className="container about-page">
      <section className="hero small">
        <div className="hero-content">
          <h1>Our Story — Peddamma’s Kitchen</h1>
          <p className="sub">From village hearth to your home — recipes passed down generations.</p>
        </div>
      </section>

      <section className="story">
        <div className="flex" style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="story-img">
            <img src="/assets/images/about us.png" alt="Peddamma cooking" loading="lazy" decoding="async" />
          </div>
          <div className="story-text" style={{ flex: 1, minWidth: '300px' }}>
            <h2>Tradition & Love</h2>
            <p>Peddamma’s Kitchen was born from a kitchen that values taste, hygiene and family. Each recipe is handcrafted using pure ingredients and no preservatives.</p>
            <ul className="features">
              <li>100% Homemade</li>
              <li>No Preservatives</li>
              <li>Traditional Recipes</li>
              <li>Trusted by Families</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="timeline">
        <h2>Why Choose Us</h2>
        <ol>
          <li><strong>Handmade:</strong> Small-batch recipes for authentic taste.</li>
          <li><strong>Hygienic:</strong> Prepared under strict cleanliness protocols.</li>
          <li><strong>Quality:</strong> Pure ingredients, no artificial additives.</li>
        </ol>
      </section>
    </main>
  );
};

export default About;
