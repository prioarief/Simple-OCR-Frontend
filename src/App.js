import React from "react";
import axios from "axios";

const App = () => {
  const [Image, setImage] = React.useState(null);
  const [Demo, setDemo] = React.useState(null);
  const [Key, setKey] = React.useState(null);
  const [Error, setError] = React.useState(null);
  const [Response, setResponse] = React.useState(null);
  const [IsLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", Image[0]);
      formData.append("key", Key);
      const hit = await axios.post("http://100.25.220.74:2020/", formData);
      setIsLoading(false);
      setError(null)
      setResponse(hit.data.msg);
    } catch (error) {
      setResponse(null);
      setIsLoading(false);
      setError(error.response.data.msg);
    }
  };
  return (
    <div>
      <h1 className="text-center my-5">Hello World</h1>
      {Error && (
        <div className="alert alert-danger my-2" role="alert">
          {Error}
        </div>
      )}
      {Response && (
        <div className="alert alert-success my-2" role="alert">
          {Response}
        </div>
      )}
      <div className="container mb-3">
        <label className="form-label">Choose File</label>
        <input
          className="form-control my-2"
          type="file"
          onChange={(e) => {
            setImage(e.target.files);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              setDemo(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
          }}
        />
        <input
          className="form-control my-2"
          type="text"
          placeholder="Key, gunakan koma (,) sebagai pemisah. contoh oreo, biskuat, cheese"
          value={Key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button
          className="btn btn-info btn-sm my-3"
          onClick={handleSubmit}
          disabled={Image && Key ? false : true}
        >
          {IsLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden ml-3">Loading...</span>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
      <div className="container text-center mb-4">
        {Demo && <img className="img-fluid text-center" src={Demo} alt="img" />}
      </div>
    </div>
  );
};

export default App;
