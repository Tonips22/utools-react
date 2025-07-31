export default function Skeleton() {
  return (
    <div className="relative flex flex-col justify-start rounded-2xl bg-dark overflow-hidden h-[425px] animate-pulse">
      {/* Imagen simulada */}
      <div className="w-full h-1/3 bg-gray-700 rounded-tl-2xl rounded-tr-2xl" />

      {/* Contenido */}
      <div className="flex flex-col justify-between p-4 h-2/3">
        <div className="flex flex-col gap-4">
          <div className="h-6 bg-gray-600 rounded w-3/4" />
          <div className="h-4 bg-gray-600 rounded w-full" />
          <div className="h-3 bg-gray-600 rounded w-1/2" />
        </div>

        {/* Etiquetas simuladas */}
        <div className="labels flex flex-row gap-2 flex-wrap mt-4">
          <div className="h-6 w-16 bg-gray-700 rounded-full" />
          <div className="h-6 w-20 bg-gray-700 rounded-full" />
          <div className="h-6 w-12 bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}
