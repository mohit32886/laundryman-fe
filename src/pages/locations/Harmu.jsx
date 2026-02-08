import LocationTemplate from './LocationTemplate';

const Harmu = () => {
  return (
    <LocationTemplate
      areaName="Harmu"
      areaDescription="Premium laundry and dry cleaning service in Harmu, Ranchi. Free home pickup & delivery with German eco-friendly cleaning solutions. Get 20% off on your first order!"
      landmarks={[
        'Harmu Housing Colony',
        'Harmu Chowk',
        'Harmu Road',
        'Harmu Market',
        'Near Harmu Railway Station',
        'Harmu Residential Area'
      ]}
      testimonials={[
        {
          name: 'Manisha Sharma',
          location: 'Harmu, Ranchi',
          review: 'Premium quality wash & steam iron at affordable rates. Very satisfied with their service!'
        },
        {
          name: 'Rajesh Kumar',
          location: 'Harmu, Ranchi',
          review: 'Best laundry service in Harmu. They pick up and deliver on time. Highly recommended!'
        }
      ]}
      coordinates={{ lat: '23.3441', lng: '85.3096' }}
    />
  );
};

export default Harmu;
