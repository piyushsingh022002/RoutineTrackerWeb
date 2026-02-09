import recotrackLogo from '../../../Logos/recotrack.logo.png';
import { AdminLinkWrapper,AdminTooltip,ExternalLink,HeaderContainer,LeftGroup, Logo, LogoImg, Nav, RightGroup, StyledNavLink} from '../common.styles/Header.styles';

const PublicHeader: React.FC = () =>{
    return(
        <HeaderContainer>
            <LeftGroup>
                {/* Logo links to landing page */}
        <Logo to="/landing" aria-label="Home">
          <LogoImg
            src={recotrackLogo}
            alt="Routine Tracker logo (progress bars)"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </Logo>

        <Nav>
          {/* Public navigation */}
          <StyledNavLink to="/aboutIRT">About Us</StyledNavLink>
          <ExternalLink
            href="https://text-utils-piyush.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            title="Text Editor"
          >
            Text Editor
          </ExternalLink>
        </Nav>

            </LeftGroup>
            <RightGroup>
        <AdminLinkWrapper>
          <ExternalLink
            href="https://my-portfolio-kappa-five-56.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Admin's Portal
          </ExternalLink>
          <AdminTooltip role="status" aria-live="polite">
            <strong>Admin Notice</strong>
            Hovering here reveals this notice. Click the button to visit the admin's portfolio.
          </AdminTooltip>
        </AdminLinkWrapper>
      </RightGroup>
        </HeaderContainer>
    )
};

export default PublicHeader;