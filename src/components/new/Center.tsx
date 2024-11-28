import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

interface CenterProps {
  children: ReactNode; // ReactNode is a type that includes all possible children types
}

const Center: React.FC<CenterProps> = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Center;
