import LocationTemplate from './LocationTemplate';

const Kantatoli = () => {
  return (
    <LocationTemplate
      areaName="Kantatoli"
      areaDescription="Premium laundry and dry cleaning service in Kantatoli, Ranchi. Free home pickup & delivery with German eco-friendly cleaning solutions. Get 20% off on your first order!"
      landmarks={[
        'Kantatoli Housing Colony',
        'Kantatoli Chowk',
        'Kantatoli Road',
        'Kantatoli Market',
        'Near Kantatoli Railway Station',
        'Kantatoli Residential Area'
      ]}
      testimonials={[
        {
          name: 'Rajesh Kumar',
          location: 'Kantatoli, Ranchi',
          review: 'Excellent B2B services for our office. Highly reliable and professional. Best laundry service in Kantatoli!'
        },
        {
          name: 'Sunita Kumari',
          location: 'Kantatoli, Ranchi',
          review: 'Great dry cleaning service. They use eco-friendly solutions which is important for my family\'s health.'
        }
      ]}
      coordinates={{ lat: '23.3441', lng: '85.3096' }}
    />
  );
};

export default Kantatoli;
