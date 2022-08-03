export default function ActionList({
  edit, // boolean
  _delete, // boolean
  share, // boolean
  object, // string
}) {
  return (
    <div className="flex gap-2 text-neutral-500 text-xs">
      {edit && <button>Edit</button>}
      {_delete && <button>Delete</button>}
      {share && <button>Share</button>}
    </div>
  );
}
