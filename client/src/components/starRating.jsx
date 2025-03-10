import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types"

const StarRating = ({ formValues, setFormValues }) => {
    const[hover,setHover]=useState(0)
     const handleClick = (rating) => {
    setFormValues({ ...formValues, rating });
  };

  return (
    <div className="flex flex-col justify-center text-center items-center gap-3">
      <label className="block text-gray-600 font-medium">Puntuación:</label>
      <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                      key={star}
                      icon={faStar}
                      className={`cursor-pointer text-3xl ${hover >= star || formValues.rating >= star ? "text-yellow-400"
                              : "text-gray-300"
            }`}
                      onClick={() => handleClick(star)}
                    onMouseEnter={() => setHover(star)} // Cambiar estado de hover cuando el cursor entra
                     onMouseLeave={() => setHover(0)} // Restablecer hover cuando el cursor sale
          />
        ))}
      </div>
    </div>
  );
};

StarRating.propTypes = {
  formValues: PropTypes.shape({
    rating: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
  }).isRequired,
  setFormValues: PropTypes.func.isRequired,
};

export default StarRating;