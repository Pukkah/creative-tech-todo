export const TodoTiem = ({ title }: { title: string }) => (
  <li
    className="flex h-[46px] items-center rounded-xl border-2 border-black px-2.5"
    title={title}
  >
    <div className="truncate text-2xl leading-[1.185] text-black">{title}</div>
  </li>
);
