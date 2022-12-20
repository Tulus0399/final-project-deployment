import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // console.log(id)

  const editPhoto = (e) => {
    e.preventDefault();
    // TODO: answer here
    const datas = {
      imageUrl,
      captions,
      updatedAt: new Date(),
    }
    // TODO: answer here
    fetch(`http://localhost:3001/photos/${id}`, {
      method: "PATCH", // HTTP method menggunakan PUT
      headers: {
        // HTTP headers
        "Content-Type": "application/json", // type data yang dikirim
      },
      body: JSON.stringify(datas), // data yang dikirim
    })
      .then((response) => response.json())
      .then(() => navigate('/photos'))


  };

  // console.log(id)
  useEffect(() => {
    setLoading(true);

    // console.log(id)
    fetch(`http://localhost:3001/photos/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setCaptions(json.captions);
        setImageUrl(json.imageUrl)
        // console.log(json)
        setLoading(false);
      })

      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);


  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
