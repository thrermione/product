import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewContainer from './ReviewContainer';
import SafetyWarning from './SafetyWarning';
import TabList from './TabList';

export const getProduct = async (id) => {
  try {
    return await axios.get(`/product/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};

const ProductOverview = () => {
  const [productData, setProductData] = useState({});
  const randomProductId = Math.floor(Math.random() * (Math.floor(100) - Math.ceil(1) + 1)) + 1;
  const {
    id,
    productName,
    price,
    reviewCount,
    rating,
    themeName,
    themeImageUrl,
    featured,
    chokingHazard,
    productLimit,
    productImageUrl,
    productAvailabilityOnline,
  } = productData;

  useEffect(() => {
    getProduct(randomProductId)
      .then(({ data }) => {
        setProductData(data[0]);
      })
      .catch((error) => {
        throw new Error(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <Container>
      <BadgeWrapper>
        <BadgeContainer>
          <FeaturedBadge>{featured}</FeaturedBadge>
        </BadgeContainer>
      </BadgeWrapper>
      <ThemeImage
        src={themeImageUrl}
        alt=""
      />
      <Spacer />
      <ProductName>{productName}</ProductName>
      <Spacer />
      <ReviewContainer
        reviewCount={reviewCount}
        rating={rating}
        productImageUrl={productImageUrl}
      />
      {chokingHazard ? <SafetyWarning /> : null}
      <ProductPrice>{`$${price}`}</ProductPrice>
      <TabList
        productLimit={productLimit}
        productAvailabilityOnline={productAvailabilityOnline}
        themeName={themeName}
        productId={id}
      />
    </Container>
  );
};

export default ProductOverview;

const Container = styled.div`
  display: flex;
  font-family: "Cera Pro", sans-serif;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background: rgb(255, 255, 255);
  padding: 18px;
  max-width: 352.797px;
  min-width: 250px;
  line-height: 1.5;
  text-size-adjust: 100%;
  @media screen and (min-width: 250px) {
    width: 30%;
  };
  @media screen and (max-width: 352.797px) {
    flex: 0 0 30%;
  };
  margin: auto;
  width: auto;
`;

const BadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 0.3125rem;
`;

const BadgeContainer = styled.div`
  display: inline-block;
  margin-right: 0.27rem;
`;

const FeaturedBadge = styled.span`
  font-size: .75rem;
  line-height: 1.1875rem;
  padding: 0.19rem;
  background: rgb(255, 207, 0);
`;

const ThemeImage = styled.img`
  display: block;
  heigh: auto;
  maxWidth: 100%;
  verticalAlign: middle;

`;

const ProductName = styled.span`
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.6875rem;
`;

const ProductPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.6875rem;
`;

const Spacer = styled.div`
  display: block;
  padding: 0px 0px 1.25rem;
`;
