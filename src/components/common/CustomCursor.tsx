import React, { useEffect, useRef } from "react";

const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 }); // off-screen initially
  const particles = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create static particles
    const numParticles = 80;
    particles.current = [];
    for (let i = 0; i < numParticles; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);


    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw particles (dots) that are close enough to the cursor to be connected
      particles.current.forEach((p) => {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          // Draw the dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#c188f7ff";
          ctx.fill();

          // Draw line to cursor
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${1 - dist / 150})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw cursor dot
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#c188f7ff";
      ctx.fill();

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;


// import React, { useEffect, useRef } from "react";

// const CustomCursor: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const mouse = useRef({ x: 0, y: 0 });
//   const particles = useRef<{ x: number; y: number; vx: number; vy: number }[]>(
//     []
//   );

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     // Create particles
//     const numParticles = 50;
//     for (let i = 0; i < numParticles; i++) {
//       particles.current.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 1,
//         vy: (Math.random() - 0.5) * 1,
//       });
//     }

//     const handleMouseMove = (e: MouseEvent) => {
//       mouse.current.x = e.clientX;
//       mouse.current.y = e.clientY;
//     };

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("resize", handleResize);

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw particles
//       particles.current.forEach((p) => {
//         p.x += p.vx;
//         p.y += p.vy;

//         if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
//         if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
//         ctx.fillStyle = "#a855f7"; // Purple-ish color
//         ctx.fill();

//         // Draw thread line to cursor if close enough
//         const dx = mouse.current.x - p.x;
//         const dy = mouse.current.y - p.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);

//         if (dist < 150) {
//           ctx.beginPath();
//           ctx.moveTo(p.x, p.y);
//           ctx.lineTo(mouse.current.x, mouse.current.y);
//           ctx.strokeStyle = `rgba(168, 85, 247, ${1 - dist / 150})`; // fade with distance
//           ctx.lineWidth = 1;
//           ctx.stroke();
//         }
//       });

//       // Draw cursor dot
//       ctx.beginPath();
//       ctx.arc(mouse.current.x, mouse.current.y, 5, 0, Math.PI * 2);
//       ctx.fillStyle = "#a855f7";
//       ctx.fill();

//       requestAnimationFrame(draw);
//     };

//     draw();

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         pointerEvents: "none",
//         zIndex: 9999,
//       }}
//     />
//   );
// };

// export default CustomCursor;















// import React, { useEffect, useRef } from 'react';

// const CustomCursor: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const points: { x: number; y: number }[] = [];

//   const maxPoints = 30;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener('resize', handleResize);

//     const handleMouseMove = (e: MouseEvent) => {
//       points.push({ x: e.clientX, y: e.clientY });
//       if (points.length > maxPoints) {
//         points.shift();
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     const animate = () => {
//       if (!ctx) return;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       ctx.beginPath();
//       for (let i = 0; i < points.length - 1; i++) {
//         const p1 = points[i];
//         const p2 = points[i + 1];
//         ctx.moveTo(p1.x, p1.y);
//         ctx.lineTo(p2.x, p2.y);
//       }
//       ctx.strokeStyle = 'rgba(50, 50, 150, 0.6)';
//       ctx.lineWidth = 2;
//       ctx.stroke();

//       requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         pointerEvents: 'none',
//         zIndex: 9999,
//       }}
//     />
//   );
// };

// export default CustomCursor;
