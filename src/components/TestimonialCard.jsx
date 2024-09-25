import PropTypes from 'prop-types';

function TestimonialCard({ testimonial }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img
        src={testimonial.image}
        alt={testimonial.author}
        className="w-16 h-16 rounded-full mx-auto mb-4"
      />
      <p className="text-gray-600">{testimonial.text}</p>
      <h3 className="text-lg font-bold mt-4">{testimonial.author}</h3>
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
