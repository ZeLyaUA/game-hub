// src/presentation/components/games/GameForm.tsx
import { GameEntity, GameStatus } from '@/domain/entities/game';
import { useImageUpload } from '@/presentation/hooks/useImageUpload';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';
import { Button, Input, Select } from '../ui';

interface GameFormProps {
  initialData?: Partial<GameEntity>;
  onSubmit: (data: Omit<GameEntity, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function GameForm({ initialData, onSubmit, onCancel, isLoading }: GameFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || GameStatus.COMING,
    image: initialData?.image || '',
    color: initialData?.color || 'from-indigo-800/80 to-purple-600/80',
    accent: initialData?.accent || 'indigo-500',
  });

  const { uploadImage, isUploading, progress } = useImageUpload();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Название игры"
        value={formData.title}
        onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Постер игры</label>
        <div className="flex items-center justify-center w-full">
          <label
            className={`
            relative flex flex-col items-center justify-center w-full h-64 
            border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${
              formData.image
                ? 'border-indigo-500 bg-gray-800/30'
                : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800/70'
            }
          `}
          >
            {formData.image ? (
              <>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    setFormData(prev => ({ ...prev, image: '' }));
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP до 5MB</p>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
          </label>
        </div>
        {isUploading && (
          <div className="mt-2">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <Input
        label="Описание"
        value={formData.description || ''}
        onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
        placeholder="Краткое описание игры"
      />

      <Select
        label="Статус"
        value={formData.status}
        onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as GameStatus }))}
        options={[
          { value: GameStatus.ACTIVE, label: 'Активна' },
          { value: GameStatus.COMING, label: 'Скоро выйдет' },
          { value: GameStatus.ARCHIVED, label: 'В архиве' },
        ]}
      />

      <div className="flex justify-end gap-4">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Отмена
          </Button>
        )}
        <Button type="submit" isLoading={isLoading || isUploading}>
          {initialData ? 'Сохранить' : 'Добавить'}
        </Button>
      </div>
    </form>
  );
}
