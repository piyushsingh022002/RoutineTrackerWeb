type LabelToggleProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export const LabelToggle: React.FC<LabelToggleProps> = ({
  label,
  checked,
  onToggle,
}) => {
  return (
    <label style={{ display: "flex", gap: 6, cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
      />
      {label}
    </label>
  );
};
