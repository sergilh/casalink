import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RatingAverageIcon = ({ averageRating }) => {
    return (
        <div className="flex-col justify-center border-2 border-[#eeeeee] border-opacity-100 rounded-xl p-1.5 transition duration-300 bg-white hover:bg-[#eeeeee]">
            <div className="flex justify-center">
                <FontAwesomeIcon
                    icon={faStar}
                    fixedWidth
                    className="text-yellow-500"
                />
            </div>
            <p className="text-center text-xs pt-1 pb-0.5 font-bold">
                Promedio
            </p>
            <p className="text-center font-bold">
                {averageRating}
            </p>
        </div>
    );
};

export default RatingAverageIcon;