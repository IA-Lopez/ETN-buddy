import React, { useState, useRef } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Image as KonvaImage, Transformer, Text as KonvaText } from 'react-konva';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ITEM_TYPE = 'LAYER';

const URLImage = ({ image, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [img] = useImage(image.src);

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  React.useEffect(() => {
    if (shapeRef.current) {
      shapeRef.current.width(image.width);
      shapeRef.current.height(image.height);
    }
  }, [image.width, image.height]);

  return (
    <>
      <KonvaImage
        image={img}
        ref={shapeRef}
        draggable
        width={image.width}
        height={image.height}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...image,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
};

const TextNode = ({ textNode, isSelected, onSelect, onDoubleClick, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  const handleLongPress = () => {
    onDoubleClick();
  };

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleTransformEnd = (e) => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    const newAttrs = {
      ...textNode,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      fontSize: node.fontSize() * scaleX,
    };
    onChange(newAttrs);
  };

  return (
    <>
      <KonvaText
        text={textNode.text}
        x={textNode.x}
        y={textNode.y}
        fontSize={textNode.fontSize}
        fontFamily={textNode.fontFamily}
        fontStyle={textNode.fontWeight}
        fill={textNode.fill}
        stroke={textNode.stroke}
        strokeWidth={textNode.strokeWidth}
        draggable
        ref={shapeRef}
        onClick={onSelect}
        onDblClick={onDoubleClick}
        onLongPress={handleLongPress}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...textNode,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 30 || newBox.height < 30) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const LayerItem = ({ id, name, type, index, isSelected, onSelect, onMoveLayer, onRemoveLayer, onEdit }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMoveLayer(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { type: ITEM_TYPE, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`layer-item ${isSelected ? 'selected' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => onSelect(id)}
    >
      {name}
      {type === 'text' && (
        <button
          className="edit-button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(id);
          }}
        >
          EDIT
        </button>
      )}
      <button
        className="remove-button"
        onClick={(e) => {
          e.stopPropagation();
          onRemoveLayer(id);
        }}
      >
        X
      </button>
    </div>
  );
};

function Creator() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [layers, setLayers] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [editingText, setEditingText] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const fileInputRef = useRef(null);

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        const { width, height } = adjustSizeToFitScreen(img.width, img.height);
        setBackgroundImage({
          image: img,
          width,
          height
        });
      };
    };
    reader.readAsDataURL(file);
  };

  const adjustSizeToFitScreen = (imgWidth, imgHeight) => {
    const maxWidth = window.innerWidth * 0.75;
    const maxHeight = window.innerHeight * 0.75;
    let width = imgWidth;
    let height = imgHeight;

    if (width > maxWidth || height > maxHeight) {
      const widthRatio = maxWidth / width;
      const heightRatio = maxHeight / height;
      const minRatio = Math.min(widthRatio, heightRatio);
      width = width * minRatio;
      height = height * minRatio;
    }
    return { width, height };
  };

  const handleImageUpload = (imgSrc) => {
    const newImg = new window.Image();
    newImg.src = imgSrc;
    newImg.onload = () => {
      setLayers([{ 
        id: `image${layers.length + 1}`, 
        type: 'image', 
        name: `Image Layer ${layers.length + 1}`, 
        src: imgSrc, 
        x: 0, 
        y: 0, 
        width: newImg.width, 
        height: newImg.height 
      }, ...layers]);
    };
  };

  const handleTextAdd = () => {
    const newText = {
      id: `text${layers.length + 1}`,
      type: 'text',
      name: `Text Layer ${layers.length + 1}`,
      text: 'New Text',
      x: 50,
      y: 50,
      fontSize: 40,
      fontFamily: 'GOODDP',
      fontStyle: 'normal',
      fill: '#000000',
      stroke: '#000000',
      strokeWidth: 0
    };
    setLayers([newText, ...layers]);
  };

  const handleSelect = (id) => {
    if (selectedId === id) {
      selectShape(null);
    } else {
      selectShape(id);
    }
  };

  const handleDoubleClick = (textNode) => {
    setEditingText(textNode);
  };

  const handleChange = (newAttrs) => {
    const updatedLayers = layers.map((layer) => (layer.id === newAttrs.id ? newAttrs : layer));
    setLayers(updatedLayers);
  };

  const handleTextChange = (e, field) => {
    const value = field === 'strokeWidth' ? Math.max(0, parseFloat(e.target.value)) : e.target.value;
    setEditingText({
      ...editingText,
      [field]: value
    });
  
    const updatedLayers = layers.map((layer) => 
      layer.id === editingText.id ? { ...layer, [field]: value } : layer
    );
    setLayers(updatedLayers);
  };
  
  const handleColorChange = (e, field) => {
    const value = e.target.value;
    setEditingText({
      ...editingText,
      [field]: value
    });
  
    const updatedLayers = layers.map((layer) =>
      layer.id === editingText.id ? { ...layer, [field]: value } : layer
    );
    setLayers(updatedLayers);
  };

  const handleDownload = () => {
    selectShape(null); 
    setTimeout(() => {
      const uri = document.querySelector('canvas').toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'base-buddy-meme.png';
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 50);
  };

  const handleRemoveLayer = (id) => {
    setLayers(layers.filter((layer) => layer.id !== id));
    if (selectedId === id) {
      selectShape(null);
    }
  };

  const handleMoveLayer = (dragIndex, hoverIndex) => {
    const updatedLayers = [...layers];
    const [draggedLayer] = updatedLayers.splice(dragIndex, 1);
    updatedLayers.splice(hoverIndex, 0, draggedLayer);
    setLayers(updatedLayers);
  };

  const handleEdit = (id) => {
    const layer = layers.find((layer) => layer.id === id);
    if (layer.type === 'text') {
      setEditingText(layer);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="canvas-wrapper">
        <div className="toolbar">
          <button className="toolbar-button" onClick={() => fileInputRef.current.click()}>Load background</button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleBackgroundUpload}
          />
          <button className="toolbar-button" onClick={handleTextAdd}>Add Text</button>
          <div className="layers">
            {layers.map((layer, index) => (
              <LayerItem
                key={layer.id}
                id={layer.id}
                name={layer.name}
                type={layer.type}
                index={index}
                isSelected={selectedId === layer.id}
                onSelect={handleSelect}
                onMoveLayer={handleMoveLayer}
                onRemoveLayer={handleRemoveLayer}
                onEdit={handleEdit}
              />
            ))}
          </div>
          <button className="toolbar-button" onClick={handleDownload} disabled={!backgroundImage}>Download final image</button>
          <button className="toolbar-button" onClick={() => setShowHelp(true)}>Help</button>
        </div>
        <div className="canvas">
          <Stage width={backgroundImage ? backgroundImage.width : window.innerWidth * 0.75} height={backgroundImage ? backgroundImage.height : window.innerHeight * 0.75}>
            <Layer>
              {backgroundImage && (
                <KonvaImage
                  image={backgroundImage.image}
                  width={backgroundImage.width}
                  height={backgroundImage.height}
                />
              )}
              {layers.slice().reverse().map((layer) => (
                layer.type === 'image' ? (
                  <URLImage
                    key={layer.id}
                    image={layer}
                    isSelected={layer.id === selectedId}
                    onSelect={() => handleSelect(layer.id)}
                    onChange={handleChange}
                  />
                ) : (
                  <TextNode
                    key={layer.id}
                    textNode={layer}
                    isSelected={layer.id === selectedId}
                    onSelect={() => handleSelect(layer.id)}
                    onDoubleClick={() => handleDoubleClick(layer)}
                    onChange={handleChange}
                  />
                )
              ))}
            </Layer>
          </Stage>
        </div>
        <div className="image-options">
          <div className="image-slider">
            <img
              src="/images/basebuddyface.png"
              alt="Option 1"
              className="basebuddy-option"
              onClick={() => handleImageUpload('/images/basebuddyface.png')}
            />
            <img
              src="/images/basebuddysign.png"
              alt="Option 2"
              className="basebuddy-option"
              onClick={() => handleImageUpload('/images/basebuddysign.png')}
            />
            <img
              src="/images/basebuddy.png"
              alt="Option 3"
              className="basebuddy-option"
              onClick={() => handleImageUpload('/images/basebuddy.png')}
            />
          </div>
        </div>
        {editingText && (
          <div className="edit-text-modal">
            <h3>Edit Text</h3>
            <label>
              Text:
              <input
                type="text"
                value={editingText.text}
                onChange={(e) => handleTextChange(e, 'text')}
              />
            </label>
            <label>
              Font Size:
              <input
                type="number"
                value={editingText.fontSize}
                onChange={(e) => handleTextChange(e, 'fontSize')}
              />
            </label>
            <label>
              Font Weight:
              <select
                value={editingText.fontWeight}
                onChange={(e) => handleTextChange(e, 'fontWeight')}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="bolder">Bolder</option>
                <option value="lighter">Lighter</option>
              </select>
            </label>
            <label>
              Font Family:
              <select
                value={editingText.fontFamily}
                onChange={(e) => handleTextChange(e, 'fontFamily')}
              >
                <option value="GOODDP">GOODDP</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
              </select>
            </label>
            <label>
              Text Color:
              <input
                type="color"
                value={editingText.fill}
                onChange={(e) => handleColorChange(e, 'fill')}
              />
            </label>
            <label>
              Border Width:
              <input
                type="number"
                value={editingText.strokeWidth}
                onChange={(e) => handleTextChange(e, 'strokeWidth')}
              />
            </label>
            <label>
              Border Color:
              <input
                type="color"
                value={editingText.stroke}
                onChange={(e) => handleColorChange(e, 'stroke')}
              />
            </label>
            <button className="cancel" onClick={() => setEditingText(null)}>Close</button>
          </div>
        )}
        {showHelp && (
          <div className="help-modal">
            <div className="help-content">
              <h3>Help</h3>
              <p>Welcome to the Base Buddy Image Creator! Here are the features you can use:</p>
              <ul>
                <li><strong>1. Add Background:</strong> Click "Load background" to upload a background image.</li>
                <li><strong>2. Edit:</strong></li>
                <li><strong>Add Text -</strong> Click "Add Text" to insert text. Double-click (or click edit button) to edit  its content and style.</li>
                <li><strong>Add Images -</strong> Click on the images in the right column to add them. Drag to reposition, resize and rotate using the editing handles.</li>
                <li><strong>Layers -</strong> Manage layers in the left column. Click to select, drag to reorder, and click the X button to delete.</li>
                <li><strong>3. Download!</strong> Click "Download final image" to get your new creation.</li>
              </ul>
              <button className="close" onClick={() => setShowHelp(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default Creator;
