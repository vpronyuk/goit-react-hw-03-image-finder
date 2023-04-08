import axios from 'axios';

const fetchImg = async (userQuery, page) => {
  const params = {
    key: '33618284-b943b6a3bf9edd3f9e88f078b',
    q: userQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    page,
    per_page: 12,
  };

  try {
    const response = await axios.get('https://pixabay.com/api/', { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchImg;
