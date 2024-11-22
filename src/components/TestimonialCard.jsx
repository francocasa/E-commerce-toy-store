import PropTypes from 'prop-types';

function TestimonialCard({ testimonial }) {
  return (
    <div className="w-full mx-auto min-w-52">
      <div className="p-3 text-center border border-gray-200 rounded-md h-fit min-w-52 lg:min-w-60">
        <img
          src={testimonial.image}
          alt={testimonial.author}
          className="w-3/5 aspect-square object-cover rounded-full mx-auto"
        />
        <p className="mt-4 h-12">&quot;{testimonial.text}&quot;</p>
        <h4 className="text-lg mb-2 font-medium">{testimonial.author}</h4>
      </div>
    </div>
  );
}

// Definición de PropTypes
TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default TestimonialCard;
