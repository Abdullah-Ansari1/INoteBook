import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3" style={{ color: "black"}}>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                        <button className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success");}} > del</button>
                        <button className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}>update</button>
                    </div>
                   <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem
