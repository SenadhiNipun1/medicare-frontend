/**
 * Logger class
 * @class Logger
 * @classdesc Logger class to log messages, errors, and warnings, only in development mode (NODE_ENV !== 'production')
 * @static
 * @example
 * Logger.log('This is a log message')
 * Logger.error('This is an error message')
 * Logger.warn('This is a warning message')
 * @returns {void}
 */

/* eslint-disable no-console */

const getCallerInfo = () => {
  const stack = new Error().stack;
  const caller = stack?.split("\n")[3]; // Adjust index based on call depth
  const match = caller?.match(/at .* \((.+):(\d+):(\d+)\)/);
  if (match) {
    const [, filepath, line, column] = match;
    const filename = filepath.split("/").pop() || "unknown";
    return { filename, line, column };
  }
  return { filename: "unknown", line: "unknown", column: "unknown" };
};

class Logger {
  static log(message: string, ...optionalParams: unknown[]) {
    if (process.env.NODE_ENV !== "production") {
      const { filename, line, column } = getCallerInfo();
      const timestamp = new Date().toISOString();
      console.log(
        `%c[${timestamp}] [LOG] ${filename}:${line}:${column}`,
        "color: #007acc; font-weight: bold; background: rgba(240, 248, 255, 0.8); padding: 2px 4px; border-radius: 3px;",
      );
      console.log(`📝 ${message}`, ...optionalParams);
    }
  }

  static error(message: string, ...optionalParams: unknown[]) {
    if (process.env.NODE_ENV !== "production") {
      const { filename, line, column } = getCallerInfo();
      const timestamp = new Date().toISOString();
      console.log(
        `%c[${timestamp}] [ERROR] ${filename}:${line}:${column}`,
        "color: #ffffff; font-weight: bold; background: rgba(255, 68, 68, 0.5); padding: 2px 4px; border-radius: 3px;",
      );
      console.error(`❌ ${message}`, ...optionalParams);
    }
  }

  static warn(message: string, ...optionalParams: unknown[]) {
    if (process.env.NODE_ENV !== "production") {
      const { filename, line, column } = getCallerInfo();
      const timestamp = new Date().toISOString();
      console.log(
        `%c[${timestamp}] [WARN] ${filename}:${line}:${column}`,
        "color: #000000; font-weight: bold; background: rgba(255, 204, 0, 0.5); padding: 2px 4px; border-radius: 3px;",
      );
      console.warn(`⚠️ ${message}`, ...optionalParams);
    }
  }
}

export default Logger;
