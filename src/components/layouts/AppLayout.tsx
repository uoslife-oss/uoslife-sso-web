import * as React from 'react';
import { ComponentPropsWithRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Col from '@/components/utils/Col';
import Row from '@/components/utils/Row';
import { LayoutRouteProps } from '@/router/Routes';

type Props = ComponentPropsWithRef<'div'> & LayoutRouteProps;

const AppLayout: React.FC<Props> = ({ title, description, children }) => {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} | 통합계정` : '시대생 통합계정'}</title>
        <meta
          property="og:title"
          content={title ? `${title} | 통합계정` : '시대생 통합계정'}
        />
        <meta property="og:description" content={description} />
      </Helmet>

      <Container align="center">
        <Card>
          <header>
            <Col gap={32}>
              <LogoLink to="/">
                <Row align="center" gap={8}>
                  <LogoImage src="/logo.svg" alt="" />
                  <LogoTitle>시대생 통합계정</LogoTitle>
                </Row>
              </LogoLink>
              <Col>
                {title && <CardTitle>{title}</CardTitle>}
                {description && (
                  <CardDescription>{description}</CardDescription>
                )}
              </Col>
            </Col>
          </header>

          <article>{children}</article>

          <Footer>
            <Col gap={8}>
              <Row gap={8}>
                <ServiceLink
                  href="https://www.uoslife.team/docs/privacy"
                  target="_blank"
                >
                  개인정보처리방침
                </ServiceLink>
                <ServiceLink
                  href="https://www.uoslife.team/docs/tos"
                  target="_blank"
                >
                  서비스 이용약관
                </ServiceLink>
                <ServiceLink
                  href="https://www.uoslife.team/blog"
                  target="_blank"
                >
                  공지사항
                </ServiceLink>
              </Row>
              <ServiceCopyright>
                © 2022 시대생팀, All Rights Reserved.
              </ServiceCopyright>
            </Col>
          </Footer>
        </Card>
      </Container>
    </>
  );
};

const Container = styled(Col)`
  padding-top: 64px;
  padding-bottom: 64px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.White};
`;

const Card = styled(Col)`
  background: ${({ theme }) => theme.colors.White};
  border: 1px solid ${({ theme }) => theme.colors.Secondary7};
  border-radius: 12px;
  padding: 24px 32px;
  width: 100%;
  min-width: 320px;
  max-width: 390px;
  gap: 48px;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const LogoImage = styled.img`
  height: 24px;
`;

const LogoTitle = styled.h5`
  color: ${({ theme }) => theme.colors.Black};
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.Black};
`;

const CardDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.Secondary4};
`;

const Footer = styled.footer``;

const ServiceLink = styled.a`
  ${({ theme }) => theme.typographies.Body3};
  color: ${({ theme }) => theme.colors.Secondary3}
  cursor: pointer;
  text-decoration: none;
`;

const ServiceCopyright = styled.p`
  ${({ theme }) => theme.typographies.Body3};
  color: ${({ theme }) => theme.colors.Secondary4};
`;

export default AppLayout;
