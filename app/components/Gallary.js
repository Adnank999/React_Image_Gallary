"use client";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Gallary = () => {
  const [images, setImages] = useState([
    "/image-0.webp",
    "/image-1.webp",
    "/image-2.webp",
    "/image-3.webp",
    "/image-4.webp",
    "/image-5.webp",
    "/image-6.webp",
    "/image-7.webp",
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(images);
    const [movedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedItem);
    setImages(reorderedImages);
  };

  return (
    <div class="flex flex-wrap mx-4 mt-10 p-10">
        <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="gallery">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-wrap"
          >
            {images.map((image, index) => (
              <Draggable
                id={index}
                draggableId={`image-${index}`}
                index={index}
                
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps} // Ensure dragHandleProps is applied here
                    class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4"
                  >
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      class={`w-full h-auto ${
              index === 3 ? 'lg:h-64 xl:h-80' : 'lg:h-32 xl:h-40'
            } object-cover rounded-md cursor-pointer`}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </div>
    
  );
};

export default Gallary;
