import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, EraserIcon, SaveIcon } from '@heroicons/react/outline';

interface DrawingCanvasProps {
  onSave: (imageData: string) => void;
}

export default function DrawingCanvas({ onSave }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = tool === 'pencil' ? '#000' : '#fff';
    ctx.lineWidth = tool === 'pencil' ? 2 : 10;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const imageData = canvas.toDataURL();
    onSave(imageData);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTool('pencil')}
          className={`p-2 rounded-full ${
            tool === 'pencil' ? 'bg-sky-spiritual text-white' : 'bg-gray-100'
          }`}
        >
          <PencilIcon className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTool('eraser')}
          className={`p-2 rounded-full ${
            tool === 'eraser' ? 'bg-sky-spiritual text-white' : 'bg-gray-100'
          }`}
        >
          <EraserIcon className="w-5 h-5" />
        </motion.button>
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border-2 border-gray-200 rounded-lg cursor-crosshair"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        className="w-full btn-primary flex items-center justify-center space-x-2"
      >
        <SaveIcon className="w-5 h-5" />
        <span>Enregistrer mon dessin</span>
      </motion.button>
    </div>
  );
}