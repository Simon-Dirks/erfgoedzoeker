import type { IconKey } from '@erfgoedzoeker/config-schema';
import { getIcon } from '@erfgoedzoeker/icon-registry';

type ConfigRowTitleProps = {
  icon?: IconKey;
  label?: string;
};

export function ConfigRowTitle({ icon, label }: ConfigRowTitleProps) {
  if (!label) {
    return null;
  }

  return (
    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-base-content">
      {icon && (
        <span
          aria-hidden="true"
          className="inline-flex [&_svg]:size-5"
          dangerouslySetInnerHTML={{ __html: getIcon(icon) }}
        />
      )}
      {label}
    </h3>
  );
}
