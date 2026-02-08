import LocationTemplate from './LocationTemplate';

const Doranda = () => {
  return (
    <LocationTemplate
      areaName="Doranda"
      areaDescription="Premium laundry and dry cleaning service in Doranda, Ranchi. Free home pickup & delivery with eco-friendly German cleaning solutions. Get 20% off on your first order!"
      landmarks={[
        'Doranda Housing Colony',
        'Doranda Chowk',
        'Doranda Road',
        'Doranda Market',
        'Near Doranda Railway Station',
        'Doranda Residential Area'
      ]}
      testimonials={[
        {
          name: 'Ashish Chawla',
          location: 'Doranda, Ranchi',
          review: 'I am very happy that Laundryman doesn\'t use PERC. They use organic chemicals. Best dry cleaning service!'
        },
        {
          name: 'Priya Verma',
          location: 'Doranda, Ranchi',
          review: 'Great service in Doranda. They pick up on time and deliver clean, fresh clothes. Highly satisfied!'
        }
      ]}
      coordinates={{ lat: '23.3441', lng: '85.3096' }}
    />
  );
};

export default Doranda;
