import styled from "styled-components";

const AuthContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #fdfcfb 45%, #f7f7ff 70%, #f9fafb 100%);
  position: relative;
  overflow: hidden;
  zoom: 1;
  transform: scale(1);
  transform-origin: top left;

  .dark & {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #1a1f35 70%, #0f172a 100%);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(17,24,39,0.05) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  
  .dark &::before {
    background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(79,70,229,0.04) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  
  .dark &::after {
    background: radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%);
  }
`;

const LoaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248, 250, 252, 0.95);
  backdrop-filter: blur(2px);
  z-index: 9999;

  .dark & {
    background: rgba(15, 23, 42, 0.95);
  }
`;

export { AuthContainer, LoaderOverlay };