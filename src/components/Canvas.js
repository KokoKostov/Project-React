

export const Canvas = ({
    width,
    height
}) => {


    return(
        <div className='canvas'>

            <canvas
                width={width}
                height={height}
            
                style={canvasStyle}
              
            />

        </div>
    );

}

const canvasStyle = {
    border: "1px solid black"
}