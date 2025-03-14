import { useNavigate } from "react-router-dom";

const EditProfileButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center ml-4">
      <button
        onClick={() => navigate('/profile/edit')}
        className="py-3 px-4 text-white font-bold rounded-full cursor-pointer transition duration-300 bg-[#ff6666] hover:bg-[#E05555]"
        style={{
          width: 'auto',
          minWidth: '200px',
          maxWidth: '300px',
        }}
      >
        Editar perfil
      </button>
    </div>
  );
};

export default EditProfileButton;