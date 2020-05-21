/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';

export const Star = () => (
  <StarWrapper type="stars">
    <svg width="100%" height="100%" viewBox="0 0 50 49">
      <g stroke="none" strokeWidth="1" fill="#FFD500">
        <path d="M49.9,18.1 C49.3,16.2 47.1,15.9 47.1,15.9 L34,13.9 L28,2 C28,2 27,0 25,0 C23,0 22,2 22,2 L16.1,13.9 L3,15.9 C3,15.9 0.8,16.2 0.2,18.1 C-0.4,20 1.2,21.6 1.2,21.6 L10.8,31 L8.3,44 C8.3,44 7.9,46.2 9.5,47.4 C11.1,48.6 13.1,47.6 13.1,47.6 L25,41.8 L37.1,47.7 C37.1,47.7 39.1,48.7 40.7,47.5 C42.3,46.3 41.9,44.1 41.9,44.1 L39.4,31.1 L49,21.7 C48.9,21.6 50.5,20 49.9,18.1 Z" fillRule="nonzero" />
      </g>
    </svg>
  </StarWrapper>
);

export const HalfStar = () => (
  <StarWrapper type="stars">
    <svg display="block" width="100%" height="100%" viewBox="0 0 28 27">
      <g stroke="none" strokeWidth="1">
        <g fill="#FFCF00" fillRule="nonzero">
          <path d="M13.7254902,23.0326531 L13.7254902,0 C12.627451,0 12.0784314,1.10204082 12.0784314,1.10204082 L8.83921569,7.65918367 L1.64705882,8.76122449 C1.64705882,8.76122449 0.439215686,8.92653061 0.109803922,9.97346939 C-0.219607843,11.0204082 0.658823529,11.9020408 0.658823529,11.9020408 L5.92941176,17.0816327 L4.55686275,24.244898 C4.55686275,24.244898 4.3372549,25.4571429 5.21568627,26.1183673 C6.09411765,26.7795918 7.19215686,26.2285714 7.19215686,26.2285714 L13.7254902,23.0326531 Z" />
        </g>
        <g transform="translate(13.725490, 0.000000)" fill="#CCCCCC" fillRule="nonzero">
          <path d="M13.6705882,9.97346939 C13.3411765,8.92653061 12.1333333,8.76122449 12.1333333,8.76122449 L4.94117647,7.65918367 L1.64705882,1.10204082 C1.64705882,1.10204082 1.09803922,0 0,0 C0,0 0,0 0,0 L0,23.0326531 L6.64313725,26.2836735 C6.64313725,26.2836735 7.74117647,26.8346939 8.61960784,26.1734694 C9.49803922,25.5122449 9.27843137,24.3 9.27843137,24.3 L7.90588235,17.1367347 L13.1764706,11.9571429 C13.1215686,11.9020408 14,11.0204082 13.6705882,9.97346939 Z" />
        </g>
      </g>
    </svg>
  </StarWrapper>
);

export const NoStar = () => (
  <StarWrapper type="stars">
    <svg width="100%" height="100%" viewBox="0 0 50 49">
      <g stroke="none" strokeWidth="1" fill="#CACACA">
        <path d="M49.9,18.1 C49.3,16.2 47.1,15.9 47.1,15.9 L34,13.9 L28,2 C28,2 27,0 25,0 C23,0 22,2 22,2 L16.1,13.9 L3,15.9 C3,15.9 0.8,16.2 0.2,18.1 C-0.4,20 1.2,21.6 1.2,21.6 L10.8,31 L8.3,44 C8.3,44 7.9,46.2 9.5,47.4 C11.1,48.6 13.1,47.6 13.1,47.6 L25,41.8 L37.1,47.7 C37.1,47.7 39.1,48.7 40.7,47.5 C42.3,46.3 41.9,44.1 41.9,44.1 L39.4,31.1 L49,21.7 C48.9,21.6 50.5,20 49.9,18.1 Z" fillRule="nonzero" />
      </g>
    </svg>
  </StarWrapper>
);

export const Heart = ({ addedToWishlist }) => (
  <StyledHeart width="100%" height="100%" viewBox="0 0 40 40" alt="" className="WishlistButtonstyles__StyledWishlistIcon-d720r1-1 hFCcpa" data-di-res-id="df6553d8-65a66aa5" data-di-rand="1589769598451">
    <rect fill="white" width="40" height="40" rx="20" />
    <path d="M19.986 30l.014-.014.014.014 8.223-8.116-.018-.019a5.678 5.678 0 0 0 1.78-4.126C30 14.569 27.398 12 24.187 12A5.829 5.829 0 0 0 20 13.762 5.827 5.827 0 0 0 15.815 12C12.604 12 10 14.569 10 17.739a5.68 5.68 0 0 0 1.782 4.126" fill={addedToWishlist ? 'rgb(0, 109, 183)' : 'white'} />
    <path d="M26.84 20.417L20 27.204l-6.84-6.787A3.67 3.67 0 0 1 12 17.739C12 15.677 13.71 14 15.815 14a3.82 3.82 0 0 1 2.754 1.159l1.43 1.467 1.433-1.467A3.818 3.818 0 0 1 24.186 14C26.289 14 28 15.677 28 17.739a3.673 3.673 0 0 1-1.16 2.678M19.986 30l.014-.014.014.014 8.223-8.116-.018-.019a5.678 5.678 0 0 0 1.78-4.126C30 14.569 27.398 12 24.187 12A5.829 5.829 0 0 0 20 13.762 5.827 5.827 0 0 0 15.815 12C12.604 12 10 14.569 10 17.739a5.68 5.68 0 0 0 1.782 4.126" fill="rgb(0, 109, 183)" />
  </StyledHeart>
);

export const Minus = ({ quantity }) => (
  <svg className="minus" width="14px" height="2px" viewBox="0 0 14 2" aria-hidden="true" data-di-rand="1589763181889">
    <polygon fill={quantity === 1 ? 'rgb(224, 224, 224)' : 'black'} points="14 2 0 2 0 -6.03961325e-14 14 -6.03961325e-14" />
  </svg>
);

export const Plus = ({ quantity, productLimit }) => (
  <svg className="add" xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 14 14" aria-hidden="true" data-di-rand="1589763181896">
    <polygon fill={quantity === productLimit ? 'rgb(224, 224, 224)' : 'black'} points="14 8 0 8 0 6 14 6" />
    <rect fill={quantity === productLimit ? 'rgb(224, 224, 224)' : 'black'} fillRule="nonzero" x="6" y="0" width="2" height="14" />
  </svg>
);

export const InStockSymbol = () => (
  <svg width="20px" height="13px" viewBox="0 0 20 13">
    <path d="M0 5.703L7.177 13 20 0h-4.476L7.177 8.442 4.476 5.723H2.238z" fill="rgb(0,133,55)" fillRule="evenodd" />
  </svg>
);

export const OutOfStockSymbol = ({ black }) => (
  <svg viewBox="0 0 17 17" width="17px" height="17px">
    <path d="M10.377 8.142l5.953-5.954-2.234-2.234-5.954 5.954L2.188-.046-.046 2.188l5.954 5.954-5.954 5.954 2.234 2.234 5.954-5.953 5.954 5.953 2.234-2.234z" fill={black ? "black" : "rgb(208, 2, 27)"} fillRule="evenodd" />
  </svg>
);

export const SearchButton = () => (
  <StyledSearchButton kind="secondary" type="submit" aria-label="Find Store" data-testid="queryClick">
    <svg width="18px" height="18px" viewBox="0 0 18 18">
      <path d="M18 16.615c0 .375-.137.7-.412.973a1.331 1.331 0 0 1-.973.412 1.28 1.28 0 0 1-.973-.412l-3.71-3.7a7.41 7.41 0 0 1-4.317 1.342c-1.03 0-2.017-.2-2.958-.6a7.616 7.616 0 0 1-2.434-1.623 7.605 7.605 0 0 1-1.622-2.433A7.472 7.472 0 0 1 0 7.616c0-1.032.2-2.018.6-2.96a7.65 7.65 0 0 1 1.623-2.433A7.616 7.616 0 0 1 4.657.601 7.49 7.49 0 0 1 7.615 0c1.032 0 2.018.2 2.959.601.94.4 1.752.941 2.434 1.622a7.624 7.624 0 0 1 1.622 2.434c.4.941.601 1.927.601 2.959a7.403 7.403 0 0 1-1.342 4.316l3.71 3.71c.267.266.401.592.401.973m-5.539-9c0-1.334-.474-2.475-1.423-3.423C10.09 3.244 8.95 2.77 7.615 2.77c-1.333 0-2.475.474-3.423 1.422C3.243 5.14 2.77 6.28 2.77 7.616c0 1.334.474 2.475 1.423 3.423.948.949 2.09 1.422 3.423 1.422 1.335 0 2.475-.473 3.423-1.422.95-.948 1.423-2.09 1.423-3.423" fill="#006DB7" fillRule="evenodd" />
    </svg>
  </StyledSearchButton>
);

const StarWrapper = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: .38rem;
  &:last-of-type {
    margin-right: 0px;
  };
`;

const StyledHeart = styled.svg`
height: 1.875rem;
width: 1.875rem;
`;

const StyledSearchButton = styled.button`
  white-space: nowrap;
  transform: translateX(-1px);
  margin-right: -1px;
  box-shadow: none;
  max-height: 100%;
  padding: 0px 15px 0px 15px;
  border-radius: 0px 0.3125rem 0.3125rem 0px;
  &:hover {
    background: rgb(230, 243, 255);
  };
  cursor: pointer;
`;