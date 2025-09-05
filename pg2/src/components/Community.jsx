import './animations.css';

import brandLogo1 from '../assets/image1.png';
import brandLogo2 from '../assets/image1.png';
import brandLogo3 from '../assets/image1.png';
import brandLogo4 from '../assets/image1.png';
import brandLogo5 from '../assets/image1.png';

function Community() {
  const collaborators = [brandLogo1, brandLogo2, brandLogo3, brandLogo4, brandLogo5];
  const announcements = [
    { title: "New Corporate Training Module Launched!", date: "Sep 05, 2025", link: "#" },
    { title: "Announcing Our Fall Hackathon Series", date: "Aug 28, 2025", link: "#" },
    { title: "Community Guidelines Update", date: "Aug 15, 2025", link: "#" },
  ];

  return (
    <section className="bg-neutral-900 text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-start gap-12">
        
        {/* --- LEFT COLUMN: Brand Collaborations--- */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-2 text-yellow-400">Our Collaborations</h2>
          <p className="text-neutral-400 mb-6">Proud to collaborate with industry leaders.</p>
          
          <div className="relative w-full overflow-hidden h-20 mb-12">
            <div className="flex absolute top-0 left-0 space-x-12 whitespace-nowrap animate-marquee">
              {collaborators.map((logo, index) => <img key={`a-${index}`} src={logo} alt={`Brand ${index+1}`} className="h-10 object-contain opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-300"/>)}
              {collaborators.map((logo, index) => <img key={`b-${index}`} src={logo} alt={`Brand ${index+1}`} className="h-10 object-contain opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-300"/>)}
            </div>
          </div>

          {/* --- LEFT COLUMN: Contact Us Section --- */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Contact Us</h3>
            <div className="space-y-4 text-neutral-300">
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>contact@linkedout.com</span>
              </div>
              <div className="flex items-center gap-4">
                 <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Announcements & Socials --- */}
        <div className="w-full md:w-1/2">
          <div className="bg-neutral-800 p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Newsletter</h3>
            <ul className="space-y-3">
              {announcements.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="block hover:bg-neutral-700 p-2 rounded-md transition-transform duration-300 hover:-translate-y-1">
                    <p>{item.title}</p>
                    <p className="text-sm text-neutral-400">{item.date}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/*  --- RIGHT COLUMN: Social Icons --- */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Our Socials</h3>
            <div className="flex items-center gap-5">
              <a href="#" aria-label="LinkedIn" className="text-neutral-400 hover:text-white transition-transform duration-300 hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-neutral-400 hover:text-white transition-transform duration-300 hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919 4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 6.826c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-neutral-400 hover:text-white transition-transform duration-300 hover:scale-110">
                 <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Community;