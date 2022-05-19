import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { Box, Card, Container, Typography } from '@mui/material';
// _mock_
import { _members } from '../../_mock';
// components
import Image from '../../components/Image';
import { CarouselArrows } from '../../components/carousel';
import { MotionInView, varFade } from '../../components/animate';
// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const carouselRef = useRef(null);

  const settings = {
    infinite: false,
    slidesToShow: 4,
    centerMode: false,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Container sx={{ pb: 10, textAlign: 'center' }}>
      <MotionInView variants={varFade().inDown}>
        <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
          Nossa equipe
        </Typography>
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Um grande time é a chave do sucesso
        </Typography>
      </MotionInView>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}>
            {_members.map((member, index) => (
              <div key={`member-${index}`}>
                <MotionInView variants={varFade().in} sx={{ px: 1.5, py: 10 }}>
                  <MemberCard member={member} />
                </MotionInView>
              </div>
            ))}
          </Slider>
        </CarouselArrows>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

function MemberCard({ member }) {
  const { name, role, avatar } = member;
  return (
    <Card key={name} sx={{ p: 1 }}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography>
      <Image src={avatar} ratio="1/1" sx={{ borderRadius: 1.5 }} />
    </Card>
  );
}
