import { createContext, useContext } from 'react';
import { CheckCircleIcon, ShieldQuestionIcon, XCircleIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ConfirmationContext = createContext(null);

const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) throw new Error('Confirmation 组件必须放在 Confirmation 内');
  return context;
};

export const Confirmation = ({ className, approval, state, ...props }) => {
  if (!approval || state === 'streaming' || state === 'input-available') return null;
  return (
    <ConfirmationContext.Provider value={{ approval, state }}>
      <Alert className={cn('flex flex-col gap-2', className)} {...props} />
    </ConfirmationContext.Provider>
  );
};

export const ConfirmationTitle = ({ className, ...props }) => (
  <AlertDescription className={cn('inline', className)} {...props} />
);

export const ConfirmationRequest = ({ children }) => {
  const { state } = useConfirmation();
  if (state !== 'approval-requested') return null;
  return children;
};

export const ConfirmationAccepted = ({ children }) => {
  const { approval, state } = useConfirmation();
  if (!approval?.approved || !['approval-responded', 'output-available'].includes(state)) return null;
  return children;
};

export const ConfirmationRejected = ({ children }) => {
  const { approval, state } = useConfirmation();
  if (approval?.approved !== false || state !== 'approval-responded') return null;
  return children;
};

export const ConfirmationActions = ({ className, ...props }) => {
  const { approval, state } = useConfirmation();
  if (state !== 'approval-requested' || approval?.approved !== undefined) return null;
  return <div className={cn('flex items-center justify-end gap-2', className)} {...props} />;
};

export const ConfirmationAction = ({ className, ...props }) => <Button className={cn('ai-ui', className)} size="sm" type="button" {...props} />;

export const ConfirmationIcon = ({ approved }) =>
  approved ? <CheckCircleIcon className="size-4" /> : approved === false ? <XCircleIcon className="size-4" /> : <ShieldQuestionIcon className="size-4" />;
