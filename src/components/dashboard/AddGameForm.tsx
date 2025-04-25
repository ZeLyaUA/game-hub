// src/components/dashboard/AddGameForm.tsx
'use client';

import { addGame } from '@/app/actions/games';
import { AlertCircle, FileText, ImageIcon, Tag, Upload } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertContainer } from '../ui/Alert';
import { FormField, Input, Select, Textarea } from '../ui/Form';
import { ImageUpload } from '../ui/ImageUpload';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function AddGameForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const statusOptions = [
    { value: 'active', label: 'Активна' },
    { value: 'coming', label: 'Скоро выйдет' },
  ];

  async function handleSubmit(formData: FormData) {
    if (!imageUrl) {
      setError('Пожалуйста, загрузите изображение');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      formData.set('image', imageUrl);
      await addGame(formData);
      setSuccess(true);

      // Очищаем форму после успешного добавления
      const form = document.querySelector('form') as HTMLFormElement;
      form?.reset();
      setImageUrl('');

      // Убираем сообщение об успехе через 3 секунды
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <FormField label="Название игры" icon={<Tag className="w-4 h-4" />} required>
        <Input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Например: World of Warcraft"
          error={!!error}
        />
      </FormField>

      <FormField label="Постер игры" icon={<ImageIcon className="w-4 h-4" />} required>
        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          onError={setError}
          aspectRatio="poster"
        />
      </FormField>

      <FormField label="Описание" icon={<FileText className="w-4 h-4" />}>
        <Textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Краткое описание игры"
        />
      </FormField>

      <FormField label="Статус" icon={<AlertCircle className="w-4 h-4" />}>
        <Select id="status" name="status" options={statusOptions} defaultValue="coming" />
      </FormField>

      <AlertContainer>
        {error && <Alert type="error">{error}</Alert>}
        {success && <Alert type="success">Игра успешно добавлена!</Alert>}
      </AlertContainer>

      <button
        type="submit"
        disabled={isLoading || !imageUrl}
        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 
                 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-lg font-medium 
                 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                 disabled:hover:from-indigo-600 disabled:hover:to-indigo-500
                 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" color="border-white" />
            Добавление...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Добавить игру
          </>
        )}
      </button>
    </form>
  );
}
