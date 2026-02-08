import LocationTemplate from './LocationTemplate';

const Lalpur = () => {
  return (
    <LocationTemplate
      areaName="Lalpur"
      areaDescription="Best laundry and dry cleaning service in Lalpur, Ranchi. Free home pickup & delivery with world-class German eco-friendly cleaning solutions. 20% off first order!"
      landmarks={[
        'Lalpur Housing Colony',
        'Lalpur Chowk',
        'Lalpur Road',
        'Lalpur Market',
        'Near Lalpur Bus Stand',
        'Lalpur Residential Area'
      ]}
      testimonials={[
        {
          name: 'Vikash Kumar',
          location: 'Lalpur, Ranchi',
          review: 'Excellent service in Lalpur. They handle designer wear with utmost care. Very professional!'
        },
        {
          name: 'Anita Devi',
          location: 'Lalpur, Ranchi',
          review: 'Best laundry service near me. Free pickup and delivery makes it so convenient. Highly recommended!'
        }
      ]}
      coordinates={{ lat: '23.3441', lng: '85.3096' }}
    />
  );
};

export default Lalpur;
