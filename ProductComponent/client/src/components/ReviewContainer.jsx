import React from 'react';
import styled from 'styled-components';
import { Star, HalfStar, NoStar } from './SVGs';

const ReviewContainer = ({ reviewCount, rating }) => {
  const stars = [];
  let ratingValue = rating;
  for (let i = 0; i < 5; i += 1, ratingValue -= 1) {
    if (ratingValue >= 1) {
      stars.push(<Star />);
    } else if (ratingValue <= 0) {
      stars.push(<NoStar />);
    } else {
      stars.push(<HalfStar />);
    }
  }

  const scrollToReviews = () => {
    const reviewSection = document.getElementById('reviews-overview');
    return reviewSection ? reviewSection.scrollIntoView() : null;
  };

  return (
    <Container className="rating-review">
      <RatingBar>
        <StarsWrapper data-testid={rating}>
          {stars}
        </StarsWrapper>
      </RatingBar>
      <Button kind="ghost" type="submit" onClick={scrollToReviews}>
        {`${reviewCount} Reviews`}
      </Button>
      <Button kind="ghost" type="submit">Submit Review</Button>
    </Container>
  );
};


export default ReviewContainer;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
  margin-left: -1.25rem;
  width: calc(100% + 1.25rem);
`;

const Button = styled.button`
  display: inline-block;
  width: auto;
  border-collapse: collapse;
  text-align: center;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.1875rem;
  color: rgb(0, 109, 183);
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  border-color: transparent;
  cursor: pointer;
  padding: 0.1875rem 0px 0px;
  margin: 0.3125rem 0px 0.3125rem 1.25rem;
`;

const RatingBar = styled.div`
  margin: 0.3125rem 0px 0.3125rem 1.25rem;
`;

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
