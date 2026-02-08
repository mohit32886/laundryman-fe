import LocationTemplate from './LocationTemplate';

const Hinoo = () => {
  return (
    <LocationTemplate
      areaName="Hinoo"
      areaDescription="Best laundry and dry cleaning service in Hinoo, Ranchi. Free home pickup & delivery with world-class German eco-friendly cleaning solutions. 20% off first order!"
      landmarks={[
        'Hinoo Housing Colony',
        'Hinoo Chowk',
        'Hinoo Road',
        'Hinoo Market',
        'Near Hinoo Bus Stand',
        'Hinoo Residential Area'
      ]}
      testimonials={[
        {
          name: 'Smita Mukherjee',
          location: 'Hinoo, Ranchi',
          review: 'Professional Team. On Time Services. Optimal pricing. Been using their service for 3 years!'
        },
        {
          name: 'Amit Singh',
          location: 'Hinoo, Ranchi',
          review: 'Excellent dry cleaning service in Hinoo. They handle delicate fabrics with great care.'
        }
      ]}
      coordinates={{ lat: '23.3441', lng: '85.3096' }}
    />
  );
};

export default Hinoo;
